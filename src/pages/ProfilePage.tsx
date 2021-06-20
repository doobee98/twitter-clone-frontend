import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ContentTemplate from 'components/base/ContentTemplate';
import ExploreSideBar from 'components/base/ExploreSideBar';
import PageTemplate from 'components/base/PageTemplate';
import ProfileMain from 'components/profile/ProfileMain';
import { useAppDispatch, useHomeSelector, useUserSelector } from 'hooks/redux';
import { clearProfileState, getUserFeed } from 'modules/profile';
import { fetchUser, getUser } from 'modules/userRecord';
import { fetchUserFeed } from 'modules/home';
import Tweet from 'models/tweet';

interface ProfilePageParams {
  id: string;
}

const ProfilePage: React.FC = () => {
  const { id: paramId } = useParams<ProfilePageParams>();
  const username = useUserSelector(paramId, (user) => user?.username);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const dispatch = useAppDispatch();

  interface payloadInterface {
    totalCount: number;
    data: Array<any>;
  }

  const handleFetchFeed = async () => {
    const res = await dispatch(fetchUserFeed(paramId));

    if (res.type.toString() === 'home/fetchUserFeed/rejected') {
      setIsError(true);
      return;
    }

    await setIsLoading(false);

    const payload = (await res.payload) as payloadInterface;
    const newFeed = (await payload.data) as Tweet[];

    Promise.all(newFeed.map((tweet) => dispatch(getUser(tweet.writer_id))));
  };

  useEffect(() => {
    dispatch(clearProfileState());
    handleFetchFeed();
    dispatch(getUserFeed(paramId));
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
    </PageTemplate>
  );
};

export default ProfilePage;
