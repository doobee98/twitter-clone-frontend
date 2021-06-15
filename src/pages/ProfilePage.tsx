import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ContentTemplate from 'components/base/ContentTemplate';
import ExploreSideBar from 'components/base/ExploreSideBar';
import PageTemplate from 'components/base/PageTemplate';
import ProfileMain from 'components/profile/ProfileMain';
import { useAppDispatch, useUserSelector } from 'hooks/redux';
import { getUserFeed } from 'modules/profile';
import { fetchUser } from 'modules/userRecord';

interface ProfilePageParams {
  id: string;
}

const ProfilePage: React.FC = () => {
  const { id: paramId } = useParams<ProfilePageParams>();
  const username = useUserSelector(paramId, (user) => user?.username);
  const dispatch = useAppDispatch();
  const [initLoading, setInitLoading] = useState(false);

  const initialFetch = async (id: string) => {
    if (initLoading) {
      await setInitLoading(false);
    }
    await Promise.all([dispatch(fetchUser(id)), dispatch(getUserFeed(id))]);
    setInitLoading(true);
  };

  useEffect(() => {
    initialFetch(paramId);
  }, [paramId]);

  if (!initLoading) {
    return null;
  }

  return (
    <PageTemplate title={`${username} (@${paramId})`}>
      <ContentTemplate>
        <ProfileMain userId={paramId} />
      </ContentTemplate>
      {/* <ContentTemplate width="300px" hideBorder>
        <ContentHeader hideBorder>
          <strong>SearchBar</strong>
        </ContentHeader>
        <ExploreSideBar />
      </ContentTemplate> */}
    </PageTemplate>
  );
};

export default ProfilePage;
