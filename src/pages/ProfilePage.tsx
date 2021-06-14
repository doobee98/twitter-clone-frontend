import React, { useEffect } from 'react';
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
import {
  useAppDispatch,
  useAuthSelector,
  useProfileSelector,
} from 'hooks/redux';
import { ColorPalette, hexToRgbA } from 'utils/colorUtils';
import { BasicType } from 'utils/iconUtils';
import { getUser } from 'modules/profile';

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
  const { currentUser } = useAuthSelector();
  const { user } = useProfileSelector();
  const dispatch = useAppDispatch();
  const { id: paramId } = useParams<ProfilePageParams>();

  useEffect(() => {
    if (!user || user.user_id !== paramId) {
      dispatch(getUser(paramId));
    }
  }, []);

  if (!user) {
    // TODO: 에러 띄우기? 또는 에러 페이지로 라우팅?
    return null;
  }

  // MOCK-UP DATA
  const tweetCount = 2;
  const isMyProfile = currentUser?.user_id === user.user_id;

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
