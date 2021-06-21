import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import defaultImg from '../../resources/defaultProfile.png';

interface ProfileImageWrapperProps {
  size: number;
}

const ProfileImageWrapper = styled.div<ProfileImageWrapperProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;

  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

interface ProfileImageProps {
  userid: string;
  username: string;
  profileSrc?: string;
  size?: number;
}

const ProfileImage: React.FC<ProfileImageProps> = (props) => {
  const { userid, size = 50 } = props;
  const history = useHistory();

  const goToUserProfile = () => {
    history.push(`/${userid}`);
  };

  return (
    <ProfileImageWrapper size={size} onClick={goToUserProfile}>
      <Image src={defaultImg} />
    </ProfileImageWrapper>
  );
};

export default ProfileImage;
