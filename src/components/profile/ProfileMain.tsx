import styled from 'styled-components';
import Button from 'components/base/Button';
import { ContentHeader, ContentSection } from 'components/base/ContentTemplate';
import Icon from 'components/base/Icon';
import {
  useAuthSelector,
  useHomeSelector,
  useUserRecordSelector,
} from 'hooks/redux';
import { ColorPalette, hexToRgbA } from 'utils/colorUtils';
import { BasicType } from 'utils/iconUtils';
import { useHistory } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import TweetList from '../tweet/TweetList';
import ProfileBiography from './ProfileBiography';

const BackButton = styled(Button)`
  color: ${ColorPalette.SKYBLUE};

  &:hover {
    background-color: ${hexToRgbA(ColorPalette.SKYBLUE, 0.1)};
  }
`;

const ProfileHeaderSection = styled(ContentSection)`
  padding: 0;
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

const SpaceSection = styled(ContentSection)`
  background-color: ${ColorPalette.GRAY_F9};
  height: 12px;
`;

interface ProfileMainProps {
  userId: string;
  handleFetchFeed: () => Promise<void>;
  isLoading: boolean;
  isError: boolean;
}

const ProfileMain: React.FC<ProfileMainProps> = (props) => {
  const { userId, handleFetchFeed, isLoading, isError } = props;
  const currentUser = useAuthSelector((state) => state.currentUser);
  const user = useUserRecordSelector((state) => state.userRecord[userId]);
  const feed = useHomeSelector((state) => state.feed);
  const userFeedCount = useHomeSelector((state) => state.totalCount);
  const history = useHistory();

  if (!user) {
    return null;
  }

  const isMyProfile = currentUser?.user_id === user.user_id;

  const goToBack = () => {
    history.goBack();
  };

  return (
    <>
      <ContentHeader>
        <BackButton onClick={goToBack}>
          <Icon iconType={BasicType.LEFT_ARROW} />
        </BackButton>
        <UserInfoContainer>
          <strong>{user.username}</strong>
          <TweetCount>
            {`${userFeedCount} ${userFeedCount <= 1 ? 'Tweet' : 'Tweets'}`}
          </TweetCount>
        </UserInfoContainer>
      </ContentHeader>
      <ProfileHeaderSection>
        <ProfileHeader user={user} isCurrentUser={isMyProfile} />
      </ProfileHeaderSection>
      <ContentSection>
        <ProfileBiography user={user} />
      </ContentSection>
      <SpaceSection />
      <TweetList
        feed={feed}
        handleFetchFeed={handleFetchFeed}
        isLoading={isLoading}
        isError={isError}
      />
    </>
  );
};

export default ProfileMain;
