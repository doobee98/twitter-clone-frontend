import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { ColorPalette } from 'utils/colorUtils';
import User from 'models/user';

const ProfileBiographyContainer = styled.div`
  display: block;
  padding-top: 70px;
  width: 100%;
  margin-left: -3%;
  margin-right: -3%;
`;

const ProfileBioUserName = styled.h2`
  font-weight: bold;
`;

const ProfileBioUserId = styled.div`
  display: block;
  font-size: 18px;
  color: ${ColorPalette.GRAY_76};
`;

const ProfileBioText = styled.div`
  display: block;
  white-space: pre-line;
  margin-top: 10px;
  font-size: 18px;
`;

const ProfileFollowInfo = styled.div`
  margin-top: 10px;
  display: block;
`;

const FollowNumber = styled.span`
  display: inline-block;
  font-weight: bold;
  margin-right: 4px;
`;

const FollowWord = styled.span`
  display: inline-block;
  color: ${ColorPalette.GRAY_76};
  margin-right: 4px;
`;

interface ProfileBiographyProps {
  user: User;
}

const ProfileBiography: React.FC<ProfileBiographyProps> = (props) => {
  const { user } = props;

  return (
    <ProfileBiographyContainer>
      <ProfileBioUserName>{user.username}</ProfileBioUserName>
      <ProfileBioUserId>@{user.user_id}</ProfileBioUserId>
      <ProfileBioText>{user.bio ? user.bio : 'there is no bio'}</ProfileBioText>
      <ProfileFollowInfo>
        <FollowNumber>{user.following_count}</FollowNumber>
        <FollowWord>Following</FollowWord>
        <FollowNumber> {user.follower_count}</FollowNumber>
        <FollowWord>Followers</FollowWord>
      </ProfileFollowInfo>
    </ProfileBiographyContainer>
  );
};

export default ProfileBiography;
