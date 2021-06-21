import { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import ContentTemplate from 'components/base/ContentTemplate';
import Error from 'components/base/Error';
import PageTemplate from 'components/base/PageTemplate';
import ExploreSideBar from 'components/explore/ExploreSideBar';
import ProfileMain from 'components/profile/ProfileMain';
import {
  useRootDispatch,
  useAuthSelector,
  useUserRecordSelector,
} from 'hooks/redux';
import Tweet from 'models/tweet';
import { userRecordActions } from 'modules/userRecord';
import { homeActions } from 'modules/home';

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
    await setIsError(false);

    const res = await dispatch(homeActions.fetchUserFeed(paramId));

    if (res.type.toString() === 'home/fetchUserFeed/rejected') {
      setIsError(true);
      return;
    }

    await setIsError(false);
    await setIsLoading(false);

    const payload = res.payload as PayloadInterface;
    const newFeed = payload.data;

    Promise.all(
      newFeed.map((tweet) =>
        dispatch(userRecordActions.getUser(tweet.writer_id)),
      ),
    );
  };

  const initialFetch = async () => {
    await dispatch(homeActions.clearHomeState());
    handleFetchFeed();
  };

  useEffect(() => {
    initialFetch();
  }, [paramId]);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  if (!username && isError) {
    return (
      <PageTemplate title={`Error (@${paramId})`}>
        <ContentTemplate>
          <Error
            title="404 Not Found"
            description={`cannot find user @${paramId}.`}
          />
        </ContentTemplate>
        <ContentTemplate width="300px" hideBorder>
          <ExploreSideBar />
        </ContentTemplate>
      </PageTemplate>
    );
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
