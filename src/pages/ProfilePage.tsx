import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ContentTemplate from 'components/base/ContentTemplate';
import PageTemplate from 'components/base/PageTemplate';
import ProfileMain from 'components/profile/ProfileMain';
import { useAppDispatch, useUserSelector } from 'hooks/redux';
import { clearProfileState, getUserFeed } from 'modules/profile';
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
    await Promise.all([dispatch(fetchUser(id)), dispatch(getUserFeed(id))]);
    setInitLoading(true);
  };

  useEffect(() => {
    dispatch(clearProfileState());
    initialFetch(paramId);
  }, [paramId]);

  return (
    <PageTemplate title={`${username} (@${paramId})`}>
      <ContentTemplate>
        {initLoading && <ProfileMain userId={paramId} />}
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
