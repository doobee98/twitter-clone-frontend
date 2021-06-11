import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ColorPalette } from 'utils/colorUtils';
import Button from './Button';

// TO BE REFACTORED into Button
const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  allign-items: center;

  width: 50px;
  height: 50px;

  cursor: pointer;
`;

interface ImageWrapperProps {
  profielSrc?: string;
}
const ImageWrapper = styled.div<ImageWrapperProps>`
  width: 100%;
  height: 100%;
  border-radius: ${48 / 2}px;

  background-color: ${(props) => props.profielSrc || ColorPalette.GREEN};
`;

// [REMOVED]
const TestImage = styled.div<ImageWrapperProps>``;

interface ProfileProps {
  userid: string;
  username: string;
  profileSrc?: string;
}

const Profile: React.FC<ProfileProps> = (props) => {
  const { children, userid, username, profileSrc } = props;

  const history = useHistory();
  const goToUserProfile = () => {
    history.push(`/${userid}`);
  };

  return (
    <ProfileWrapper onClick={goToUserProfile}>
      <ImageWrapper profielSrc={profileSrc}>
        <TestImage />
      </ImageWrapper>
    </ProfileWrapper>
  );
};

export default Profile;
