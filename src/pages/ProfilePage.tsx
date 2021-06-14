import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Button from 'components/base/Button';
import ContentTemplate, {
  ContentHeader,
  ContentSection,
} from 'components/base/ContentTemplate';
import ExploreSideBar from 'components/base/ExploreSideBar';
import Icon from 'components/base/Icon';
import PageTemplate from 'components/base/PageTemplate';
import ProfileHeader from 'components/profile/ProfileHeader';
import ProfileFeed from 'components/profile/ProfileFeed';
import { useAuthSelector } from 'hooks/redux';
import { ColorPalette, hexToRgbA } from 'utils/colorUtils';
import { BasicType } from 'utils/iconUtils';

const BackButton = styled(Button)`
  color: ${ColorPalette.SKYBLUE};

  &:hover {
    background-color: ${hexToRgbA(ColorPalette.SKYBLUE, 0.1)};
  }
`;

const UserInfoContainer = styled.div`
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TweetCount = styled.div`
  margin-top: 1px;
  font-size: 12px;
  color: ${ColorPalette.GRAY_70};
`;

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
  const tweetCount = 2;

  if (!user) {
    // TODO: 에러 띄우기? 또는 에러 페이지로 라우팅?
    return null;
  }

  return (
    <PageTemplate title={`${user.username} (@${user.user_id})`}>
      <ContentTemplate>
        <ContentHeader>
          <BackButton>
            <Icon iconType={BasicType.LEFT_ARROW} />
          </BackButton>
          <UserInfoContainer>
            <strong>{user.username}</strong>
            <TweetCount>
              {`${tweetCount} ${tweetCount <= 1 ? 'Tweet' : 'Tweets'}`}
            </TweetCount>
          </UserInfoContainer>
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
