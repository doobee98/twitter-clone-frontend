import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { ColorPalette } from 'utils/colorUtils';
import User from 'models/user';
import Icon from 'components/base/Icon';
import { BasicType } from 'utils/iconUtils';

const ProfileBiographyContainer = styled.div`
  display: block;
  padding-top: 70px;
  padding-bottom: 10px;
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

const AttributeIcon = styled(Icon)`
  display: inline-block;
  color: ${ColorPalette.GRAY_96};
  margin-right: 5px;
`;

const AttributeLine = styled.div`
  margin-top: 10px;
  display: block;
  text-align: left;

  & > strong {
    display: inline-block;
    margin-right: 6px;
  }

  & > span {
    display: inline-block;
    color: ${ColorPalette.GRAY_76};
    margin-right: 5px;
    left: 0px;
    position: relative;
  }
`;

const AttributeBold = styled.strong``;
const AttributeSoft = styled.span``;

interface ProfileBiographyProps {
  user: User;
}

const ProfileBiography: React.FC<ProfileBiographyProps> = (props) => {
  const { user } = props;

  const monthNames = [
    'FOO',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const monthYear = (substring: string) => {
    const yearMonthDay = substring.split('-');
    const month = parseInt(yearMonthDay[1], 10);
    return `${yearMonthDay[2]} ${monthNames[month]} ${yearMonthDay[0]}`;
  };

  return (
    <ProfileBiographyContainer>
      <ProfileBioUserName>{user.username}</ProfileBioUserName>
      <ProfileBioUserId>@{user.user_id}</ProfileBioUserId>
      <ProfileBioText>{user.bio ? user.bio : 'there is no bio'}</ProfileBioText>
      <AttributeLine>
        <AttributeBold>{user.following_count}</AttributeBold>
        <AttributeSoft>Following</AttributeSoft>
        <AttributeBold> {user.follower_count}</AttributeBold>
        <AttributeSoft>Followers</AttributeSoft>
      </AttributeLine>
      <AttributeLine>
        {user.location && (
          <>
            <AttributeIcon iconType={BasicType.LOCATION} iconSize={18} />
            <AttributeSoft>{user.location}</AttributeSoft>
          </>
        )}
        {user.website && (
          <>
            <AttributeIcon iconType={BasicType.LINK} iconSize={18} />
            <AttributeSoft>{user.website}</AttributeSoft>
          </>
        )}
        {user.joined_at && (
          <>
            <AttributeIcon iconType={BasicType.CALENDAR} iconSize={18} />
            <AttributeSoft>
              Joined at {monthYear(user.joined_at.substring(0, 10))}
            </AttributeSoft>
          </>
        )}
      </AttributeLine>
    </ProfileBiographyContainer>
  );
};

export default ProfileBiography;
