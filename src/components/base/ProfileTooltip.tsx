import React, { useState } from 'react';
import Button from 'components/base/Button';
import styled, { css } from 'styled-components';
import { ColorPalette } from 'utils/colorUtils';
import Profile from './Profile';

const ProfileTooltipItemWrapper = styled.div`
  display: flex;

  width: 100%;
  margin: 1.5px;

  word-break: break-all;
  text-align: left;
  color: black;
`;

const ProfileTooltipHeader = styled(ProfileTooltipItemWrapper)`
  justify-content: space-between;
`;

const FollowButton = styled(Button)`
  color: ${ColorPalette.WHITE};
  background-color: ${ColorPalette.SKYBLUE};
  font-weight: bold;

  &:hover {
    background-color: ${ColorPalette.SKYBLUE_DARK};
  }
`;

const ProfileTooltipUserId = styled(ProfileTooltipItemWrapper)`
  color: ${ColorPalette.GRAY_76};
`;

const ProfileTooltipUserName = styled(ProfileTooltipItemWrapper)`
  font-weight: bold;
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

  background-color: white;

  cursor: default;
`;

interface ProfileTooltipProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userid: string;
  username: string;
}

const ProfileTooltip: React.FC<ProfileTooltipProps> = (props) => {
  const { isOpen, setIsOpen, userid, username } = props;
  const [isHoverActive, setIsHoverActive] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout>();

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

  // TO BE REMOVED
  // NEED USER API
  const tempFollowButton = 'Follow';

  return (
    <>
      {(isOpen || isHoverActive) && (
        <ProfileTooltipContianer
          onMouseEnter={openProfile}
          onMouseLeave={closeProfile}
        >
          <ProfileTooltipHeader>
            <Profile userid={userid} username={username} />
            <FollowButton>{tempFollowButton}</FollowButton>
          </ProfileTooltipHeader>
          <ProfileTooltipUserName>{username}</ProfileTooltipUserName>
          <ProfileTooltipUserId>@{userid}</ProfileTooltipUserId>
          <ProfileTooltipItemWrapper>
            bio djklfasf sadlkfjsadkl asdfsafasdfafdsfas
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </ProfileTooltipItemWrapper>
          <ProfileTooltipFollowItemContainer>
            <ProfileTooltipFollowItemWrapper>
              <ProfileTooltipFollowItem isBold>130</ProfileTooltipFollowItem>
              <ProfileTooltipFollowItem isGrey>
                Following
              </ProfileTooltipFollowItem>
            </ProfileTooltipFollowItemWrapper>
            <ProfileTooltipFollowItemWrapper>
              <ProfileTooltipFollowItem isBold>1203</ProfileTooltipFollowItem>
              <ProfileTooltipFollowItem isGrey>
                Followers
              </ProfileTooltipFollowItem>
            </ProfileTooltipFollowItemWrapper>
          </ProfileTooltipFollowItemContainer>
          <ProfileTooltipWhoFollowed>
            temp : followed by anyone
          </ProfileTooltipWhoFollowed>
        </ProfileTooltipContianer>
      )}
    </>
  );
};

export default ProfileTooltip;
