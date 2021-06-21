import { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import ContentTemplate from 'components/base/ContentTemplate';
import PageTemplate from 'components/base/PageTemplate';
import ExploreSideBar from 'components/explore/ExploreSideBar';
import ProfileMain from 'components/profile/ProfileMain';
import {
  useRootDispatch,
  useAuthSelector,
  useUserRecordSelector,
} from 'hooks/redux';
import { profileActions } from 'modules/profile';
import { userRecordActions } from 'modules/userRecord';
import { homeActions } from 'modules/home';
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
  const username = useUserRecordSelector(
    (state) => state.userRecord[paramId]?.username,
  );
  const currentUser = useAuthSelector((state) => state.currentUser);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const dispatch = useRootDispatch();

  const handleFetchFeed = async () => {
    const res = await dispatch(homeActions.fetchUserFeed(paramId));

    if (res.type.toString() === 'home/fetchUserFeed/rejected') {
      setIsError(true);
      return;
    }

    await setIsLoading(false);

    const payload = res.payload as PayloadInterface;
    const newFeed = payload.data as Tweet[];

    Promise.all(
      newFeed.map((tweet) =>
        dispatch(userRecordActions.getUser(tweet.writer_id)),
      ),
    );
  };

  useEffect(() => {
    dispatch(profileActions.clearProfileState());
    dispatch(homeActions.clearHomeState());
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
      <ContentTemplate width="300px" hideBorder>
        <ExploreSideBar />
      </ContentTemplate>
    </PageTemplate>
  );
};

export default ProfilePage;
