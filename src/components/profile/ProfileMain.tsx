import { useEffect } from 'react';
import styled from 'styled-components';
import Button from 'components/base/Button';
import ContentTemplate, {
  ContentHeader,
  ContentSection,
} from 'components/base/ContentTemplate';
import Icon from 'components/base/Icon';
import {
  useAppSelector,
  useAuthSelector,
  useHomeSelector,
  useProfileSelector,
  useUserSelector,
} from 'hooks/redux';
import { ColorPalette, hexToRgbA } from 'utils/colorUtils';
import { BasicType } from 'utils/iconUtils';
import ProfileHeader from './ProfileHeader';
import FollowButton from './FollowButton';
import TweetList from '../tweet/TweetList';

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
  handleFetchFeed: () => Promise<void>;
  isLoading: boolean;
  isError: boolean;
}

const ProfileMain: React.FC<ProfileMainProps> = (props) => {
  const { userId, handleFetchFeed, isLoading, isError } = props;
  const { currentUser } = useAuthSelector();
  const user = useUserSelector(userId);
  const { feed, totalCount: userFeedCount } = useHomeSelector();

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
            {`${userFeedCount} ${userFeedCount <= 1 ? 'Tweet' : 'Tweets'}`}
          </TweetCount>
        </UserInfoContainer>
      </ContentHeader>
      <ContentSection>
        <ProfileHeader />
        {!isMyProfile && <FollowButton user={user} />}
      </ContentSection>
      <ContentTemplate>
        <TweetList
          feed={feed}
          handleFetchFeed={handleFetchFeed}
          isLoading={isLoading}
          isError={isError}
        />
      </ContentTemplate>
    </>
  );
};

export default ProfileMain;
