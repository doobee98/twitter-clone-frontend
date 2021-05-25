import React from 'react';
import styled from 'styled-components';
import { ColorPalette } from 'utils/colorUtils';

const ProfileWrapper = styled.div`
  width: 10%;
  height: 100px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-right: 12px;
  padding-top: 4px;
`;

const TestImage = styled.div`
  margin-left: 0;
  width: 48px;
  height: 48px;
  border-radius: ${48 / 2}px;
  background-color: ${ColorPalette.GREEN};
`;

const PostProfile: React.FC = () => {
  return (
    <ProfileWrapper>
      <ImageWrapper>
        <TestImage />
      </ImageWrapper>
    </ProfileWrapper>
  );
};

export default PostProfile;
