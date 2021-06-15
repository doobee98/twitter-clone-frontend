import User from 'models/user';
import styled from 'styled-components';
import Button from 'components/base/Button';
import ContentTemplate, {
  ContentHeader,
  ContentSection,
} from 'components/base/ContentTemplate';
import Icon from 'components/base/Icon';
import ProfileHeader from 'components/profile/ProfileHeader';
import ProfileFeed from 'components/profile/ProfileFeed';
import {
  useAppDispatch,
  useAuthSelector,
  useProfileSelector,
} from 'hooks/redux';
import { ColorPalette, hexToRgbA } from 'utils/colorUtils';
import { BasicType } from 'utils/iconUtils';
import { useEffect } from 'react';
import { followUser, unfollowUser } from 'modules/profile';

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

const FollowButton = styled(Button)`
  color: ${ColorPalette.SKYBLUE};
  font-weight: bold;
  border: 1px solid ${ColorPalette.SKYBLUE};

  &:hover {
    background-color: ${hexToRgbA(ColorPalette.SKYBLUE, 0.1)};
  }
`;

const FollowingButton = styled(Button)`
  color: ${ColorPalette.WHITE};
  font-weight: bold;
  border: 1px solid ${ColorPalette.SKYBLUE};
  background-color: ${ColorPalette.SKYBLUE};
`;

const UnfollowButton = styled(Button)`
  color: ${ColorPalette.WHITE};
  font-weight: bold;
  border: 1px solid ${ColorPalette.MAGENTA};
  background-color: ${ColorPalette.MAGENTA};
`;

const ProfileMain: React.FC = () => {
  const { currentUser } = useAuthSelector();
  const { user, feed, totalCount } = useProfileSelector();
  const dispatch = useAppDispatch();

  // TO BE REMOVED (test output)
  useEffect(() => {
    console.log(feed);
  }, [feed]);

  if (!user) {
    return null;
  }

  const isMyProfile = currentUser?.user_id === user.user_id;

  const handleFollow = () => {
    dispatch(followUser(user.user_id));
  };

  const handleUnfollow = () => {
    dispatch(unfollowUser(user.user_id));
  };

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
        {!isMyProfile && user.following_flag ? (
          <UnfollowButton onClick={handleUnfollow}>Unfollow</UnfollowButton>
        ) : (
          <FollowButton onClick={handleFollow}>Follow</FollowButton>
        )}
      </ContentSection>
      <ContentSection>
        <ProfileFeed />
      </ContentSection>
    </>
  );
};

export default ProfileMain;
