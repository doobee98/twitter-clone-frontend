import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ColorPalette } from 'utils/colorUtils';
import Button from './Button';
import defaultImg from '../../resources/defaultProfile.png';

// TO BE REFACTORED into Button
interface ProfileWrapperProps {
  size: number;
}

const ProfileWrapper = styled.div<ProfileWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;

  cursor: pointer;
`;

const ImageWrapper = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

interface ProfileProps {
  userid: string;
  username: string;
  profileSrc?: string;
  size?: number;
}

const Profile: React.FC<ProfileProps> = (props) => {
  const { userid, username, profileSrc, size = 50 } = props;

  const history = useHistory();
  const goToUserProfile = () => {
    history.push(`/${userid}`);
  };

  return (
    <ProfileWrapper size={size} onClick={goToUserProfile}>
      <ImageWrapper src={defaultImg} />
    </ProfileWrapper>
  );
};

export default Profile;
