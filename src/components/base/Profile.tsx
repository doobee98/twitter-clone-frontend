import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ColorPalette } from 'utils/colorUtils';
import Button from './Button';

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

interface ImageWrapperProps {
  profileSrc?: string;
}
const ImageWrapper = styled.div<ImageWrapperProps>`
  width: 100%;
  height: 100%;
  border-radius: 50%;

  background-color: ${(props) => props.profileSrc || ColorPalette.GREEN};
`;

// [REMOVED]
const TestImage = styled.div<ImageWrapperProps>``;

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
      <ImageWrapper profileSrc={profileSrc}>
        <TestImage />
      </ImageWrapper>
    </ProfileWrapper>
  );
};

export default Profile;
