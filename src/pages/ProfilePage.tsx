import { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import ContentTemplate from 'components/base/ContentTemplate';
import ExploreSideBar from 'components/base/ExploreSideBar';
import PageTemplate from 'components/base/PageTemplate';
import ProfileMain from 'components/profile/ProfileMain';
<<<<<<< HEAD
import { useAppDispatch, useAuthSelector, useUserSelector } from 'hooks/redux';
=======
import { useAppDispatch, useHomeSelector, useUserSelector } from 'hooks/redux';
>>>>>>> 4e5d799d58deaebdd12116253a1081ed71d3e0bd
import { clearProfileState, getUserFeed } from 'modules/profile';
import { fetchUser, getUser } from 'modules/userRecord';
import { clearHomeState, fetchUserFeed } from 'modules/home';
import Tweet from 'models/tweet';

interface ProfilePageParams {
  id: string;
}

interface PayloadInterface {
  userFeedCount: number;
  data: Array<Tweet>;
}

const ProfilePage: React.FC = () => {
  const { id: paramId } = useParams<ProfilePageParams>();
  const username = useUserSelector(paramId, (user) => user?.username);
  const { currentUser } = useAuthSelector();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const dispatch = useAppDispatch();

  const handleFetchFeed = async () => {
    const res = await dispatch(fetchUserFeed(paramId));

    if (res.type.toString() === 'home/fetchUserFeed/rejected') {
      setIsError(true);
      return;
    }

    await setIsLoading(false);

    const payload = res.payload as PayloadInterface;
    const newFeed = payload.data as Tweet[];

    Promise.all(newFeed.map((tweet) => dispatch(getUser(tweet.writer_id))));
  };

  useEffect(() => {
    dispatch(clearProfileState());
    dispatch(clearHomeState());
    handleFetchFeed();
  }, [paramId]);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <PageTemplate title={`${username} (@${paramId})`}>
      <ContentTemplate>
        {!isLoading && (
          <ProfileMain
            userId={paramId}
            handleFetchFeed={handleFetchFeed}
            isLoading={isLoading}
            isError={isError}
          />
        )}
      </ContentTemplate>
    </PageTemplate>
  );
};

export default ProfilePage;
