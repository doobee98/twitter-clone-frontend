import React from 'react';
import { useParams } from 'react-router-dom';
import PageTemplate from 'components/base/PageTemplate';
import ExploreSideBar from 'components/base/ExploreSideBar';
import ContentTemplate, {
  ContentHeader,
  ContentSection,
} from 'components/base/ContentTemplate';
import { useAuthSelector } from 'hooks/redux';
import ProfileHeader from 'components/profile/ProfileHeader';
import ProfileFeed from 'components/profile/ProfileFeed';

interface ProfilePageParams {
  id: string;
}

const ProfilePage: React.FC = () => {
  const authStore = useAuthSelector();
  const { currentUser } = authStore;
  const { id: user_id } = useParams<ProfilePageParams>();

  const isMyProfile = currentUser && currentUser.user_id === user_id;

  // TO BE REMOVED: 일단은 자기 자신것만 디자인하기
  const user = currentUser;

  if (!user) {
    // TODO: 에러 띄우기? 또는 에러 페이지로 라우팅?
    return null;
  }

  return (
    <PageTemplate title={`${user.username} (@${user.user_id})`}>
      <ContentTemplate>
        <ContentHeader>
          <strong>{user.username}</strong>
        </ContentHeader>
        <ContentSection>
          <ProfileHeader />
        </ContentSection>
        <ContentSection>
          <ProfileFeed />
        </ContentSection>
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
