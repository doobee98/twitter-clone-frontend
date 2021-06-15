import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ContentTemplate from 'components/base/ContentTemplate';
import ExploreSideBar from 'components/base/ExploreSideBar';
import PageTemplate from 'components/base/PageTemplate';
import ProfileMain from 'components/profile/ProfileMain';
import { useAppDispatch, useProfileSelector } from 'hooks/redux';
import { getUser, getUserFeed } from 'modules/profile';

interface ProfilePageParams {
  id: string;
}

const ProfilePage: React.FC = () => {
  const { user } = useProfileSelector();
  const dispatch = useAppDispatch();
  const { id: paramId } = useParams<ProfilePageParams>();

  useEffect(() => {
    if (!user || user.user_id !== paramId) {
      dispatch(getUser(paramId));
      dispatch(getUserFeed(paramId));
    }
  }, [paramId]);

  if (!user) {
    // TODO: 에러 띄우기? 또는 에러 페이지로 라우팅?
    return null;
  }

  return (
    <PageTemplate title={`${user.username} (@${user.user_id})`}>
      <ContentTemplate>
        <ProfileMain />
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
