import React, { useState } from 'react';
import Button from 'components/base/Button';
import styled, { css } from 'styled-components';
import { ColorPalette } from 'utils/colorUtils';
import Profile from './Profile';

const ProfileHoverItemWrapper = styled.div`
  display: flex;

  width: 100%;
  margin: 1.5px;

  word-break: break-all;
  text-align: left;
  color: black;
`;

const ProfileHoverHeader = styled(ProfileHoverItemWrapper)`
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

interface ProfileHoverUserProps {
  usertype: 'userid' | 'username';
}

const ProfileHoverUser = styled(ProfileHoverItemWrapper)<ProfileHoverUserProps>`
  ${(props) =>
    props.usertype === 'username' &&
    css`
      font-weight: bold;
    `};

  ${(props) =>
    props.usertype === 'userid' &&
    css`
      color: ${ColorPalette.GRAY_76};
    `};
`;

const ProfileHoverFollowItemContainer = styled(ProfileHoverItemWrapper)`
  flex-direction: row;
`;

const ProfileHoverFollowItemWrapper = styled.div`
  display: flex;
  margin-right: 10px;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

interface ProfileHoverFollowItemProps {
  isNumber?: boolean;
}

const ProfileHoverFollowItem = styled.div<ProfileHoverFollowItemProps>`
  margin-right: 2px;
  ${(props) =>
    props.isNumber
      ? css`
          font-weight: bold;
        `
      : css`
          color: ${ColorPalette.GRAY_76};
        `};
`;

const ProfileHoverWhoFollowed = styled(ProfileHoverItemWrapper)`
  color: ${ColorPalette.GRAY_76};
`;

const ProfileHoverContianer = styled(Button)`
  display: flex;
  flex-direction: column;
  z-index: 10;

  position: absolute;
  width: 250px;
  border: 1px solid black;
  border-radius: 10px;

  background-color: white;

  cursor: default;
`;

interface ProfileHoverProps {
  isOpen: boolean;
  userid: string;
  username: string;
}

const ProfileHover: React.FC<ProfileHoverProps> = (props) => {
  const { children, isOpen, userid, username } = props;
  const [isThisHover, setIsThisHover] = useState(false);

  const openProfile = () => {
    setIsThisHover(true);
  };

  const closeProfile = () => {
    setIsThisHover(false);
  };

  return (
    <>
      {(isOpen || isThisHover) && (
        <ProfileHoverContianer onHover={openProfile} onHoverOut={closeProfile}>
          <ProfileHoverHeader>
            <Profile userid={userid} username={username} />
            <FollowButton>Follow</FollowButton>
          </ProfileHoverHeader>
          <ProfileHoverUser usertype="username">{username}</ProfileHoverUser>
          <ProfileHoverUser usertype="userid">@{userid}</ProfileHoverUser>
          <ProfileHoverItemWrapper>
            bio djklfasf sadlkfjsadkl asdfsafasdfafdsfas
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </ProfileHoverItemWrapper>
          <ProfileHoverFollowItemContainer>
            <ProfileHoverFollowItemWrapper>
              <ProfileHoverFollowItem isNumber>130</ProfileHoverFollowItem>
              <ProfileHoverFollowItem>Following</ProfileHoverFollowItem>
            </ProfileHoverFollowItemWrapper>
            <ProfileHoverFollowItemWrapper>
              <ProfileHoverFollowItem isNumber>1203</ProfileHoverFollowItem>
              <ProfileHoverFollowItem>Followers</ProfileHoverFollowItem>
            </ProfileHoverFollowItemWrapper>
          </ProfileHoverFollowItemContainer>
          <ProfileHoverWhoFollowed>
            temp : followed by anyone
          </ProfileHoverWhoFollowed>
        </ProfileHoverContianer>
      )}
    </>
  );
};

export default ProfileHover;
