import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ContentTemplate from 'components/base/ContentTemplate';
import PageTemplate from 'components/base/PageTemplate';
import ExploreSideBar from 'components/explore/ExploreSideBar';
import ProfileMain from 'components/profile/ProfileMain';
import { useAppDispatch, useHomeSelector, useUserSelector } from 'hooks/redux';
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
      <ContentTemplate width="300px" hideBorder>
        <ExploreSideBar />
      </ContentTemplate>
    </PageTemplate>
  );
};

export default ProfilePage;
