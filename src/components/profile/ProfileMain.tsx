import styled from 'styled-components';
import Button from 'components/base/Button';
import { ContentHeader, ContentSection } from 'components/base/ContentTemplate';
import Icon from 'components/base/Icon';
import {
  useAuthSelector,
  useProfileSelector,
  useUserRecordSelector,
} from 'hooks/redux';
import { ColorPalette, hexToRgbA } from 'utils/colorUtils';
import { BasicType } from 'utils/iconUtils';
import ProfileHeader from './ProfileHeader';
import ProfileFeed from './ProfileFeed';
import FollowButton from './FollowButton';

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

interface ProfileMainProps {
  userId: string;
}

const ProfileMain: React.FC<ProfileMainProps> = (props) => {
  const { userId } = props;
  const currentUser = useAuthSelector((state) => state.currentUser);
  const totalCount = useProfileSelector((state) => state.totalCount);
  const user = useUserRecordSelector((record) => record[userId]);

  if (!user) {
    return null;
  }

  const isMyProfile = currentUser?.user_id === user.user_id;

  return (
    <>
      <ContentHeader>
        <BackButton>
          <Icon iconType={BasicType.LEFT_ARROW} />
        </BackButton>
        <UserInfoContainer>
          <strong>{user.username}</strong>
          <TweetCount>
            {`${totalCount} ${totalCount <= 1 ? 'Tweet' : 'Tweets'}`}
          </TweetCount>
        </UserInfoContainer>
      </ContentHeader>
      <ContentSection>
        <ProfileHeader />
        {!isMyProfile && <FollowButton user={user} />}
      </ContentSection>
      <ContentSection>
        <ProfileFeed />
      </ContentSection>
    </>
  );
};

export default ProfileMain;
