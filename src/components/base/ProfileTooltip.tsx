import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useAuthSelector, useUserRecordSelector } from 'hooks/redux';
import { ColorPalette } from 'utils/colorUtils';
import ProfileImage from './ProfileImage';
import FollowButton from '../profile/FollowButton';

const ProfileTooltipItemWrapper = styled.div`
  display: flex;

  width: 100%;
  margin: 1.5px;

  word-break: break-all;
  text-align: left;
  color: ${ColorPalette.BLACK};
`;

const ProfileTooltipHeader = styled(ProfileTooltipItemWrapper)`
  justify-content: space-between;
`;

const ProfileTooltipUserId = styled(ProfileTooltipItemWrapper)`
  color: ${ColorPalette.GRAY_76};
`;

const ProfileTooltipUserName = styled(ProfileTooltipItemWrapper)`
  font-weight: bold;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const ProfileTooltipFollowItemContainer = styled(ProfileTooltipItemWrapper)`
  flex-direction: row;
`;

const ProfileTooltipFollowItemWrapper = styled.div`
  display: flex;
  margin-right: 10px;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

interface ProfileTooltipFollowItemProps {
  isBold?: boolean;
  isGrey?: boolean;
}

const ProfileTooltipFollowItem = styled.div<ProfileTooltipFollowItemProps>`
  margin-right: 2px;
  ${(props) =>
    props.isBold &&
    css`
      font-weight: bold;
    `};

  ${(props) =>
    props.isGrey &&
    css`
      color: ${ColorPalette.GRAY_76};
    `}
`;

const ProfileTooltipWhoFollowed = styled(ProfileTooltipItemWrapper)`
  color: ${ColorPalette.GRAY_76};
`;

const ProfileTooltipContianer = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 10;

  position: absolute;
  width: 250px;
  padding: 5px;
  border: 1px solid black;
  border-radius: 10px;

  background-color: ${ColorPalette.WHITE};

  cursor: default;
`;

interface ProfileTooltipProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
}

const ProfileTooltip: React.FC<ProfileTooltipProps> = (props) => {
  const { isOpen, setIsOpen, userId } = props;
  const currentUser = useAuthSelector((state) => state.currentUser);
  const user = useUserRecordSelector((state) => state.userRecord[userId]);
  const [isHoverActive, setIsHoverActive] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const history = useHistory();

  if (!user) {
    return null;
  }

  const isMyProfile = currentUser?.user_id === user.user_id;

  const openProfile = () => {
    setIsHoverActive(true);
  };

  const closeProfile = () => {
    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      setIsOpen(false);
      setIsHoverActive(false);
    }, 500);

    setTimer(newTimer);
  };

  const goToProfilePage = () => {
    history.push(`/${user.user_id}`);
  };

  return (
    <>
      {(isOpen || isHoverActive) && (
        <ProfileTooltipContianer
          onMouseEnter={openProfile}
          onMouseLeave={closeProfile}
        >
          <ProfileTooltipHeader>
            <ProfileImage userid={user.user_id} username={user.username} />
            {!isMyProfile && <FollowButton user={user} />}
          </ProfileTooltipHeader>
          <ProfileTooltipUserName onClick={goToProfilePage}>
            {user.username}
          </ProfileTooltipUserName>
          <ProfileTooltipUserId>@{user.user_id}</ProfileTooltipUserId>
          <ProfileTooltipItemWrapper>
            {user.bio ? user.bio : 'there is no bio'}
          </ProfileTooltipItemWrapper>
          <ProfileTooltipFollowItemContainer>
            <ProfileTooltipFollowItemWrapper>
              <ProfileTooltipFollowItem isBold>
                {user.following_count}
              </ProfileTooltipFollowItem>
              <ProfileTooltipFollowItem isGrey>
                Following
              </ProfileTooltipFollowItem>
            </ProfileTooltipFollowItemWrapper>
            <ProfileTooltipFollowItemWrapper>
              <ProfileTooltipFollowItem isBold>
                {user.follower_count}
              </ProfileTooltipFollowItem>
              <ProfileTooltipFollowItem isGrey>
                Followers
              </ProfileTooltipFollowItem>
            </ProfileTooltipFollowItemWrapper>
          </ProfileTooltipFollowItemContainer>
          {/* <ProfileTooltipWhoFollowed>
            temp : followed by anyone
          </ProfileTooltipWhoFollowed> */}
        </ProfileTooltipContianer>
      )}
    </>
  );
};

export default ProfileTooltip;
