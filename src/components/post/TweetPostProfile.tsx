import React from 'react';
import styled from 'styled-components';
import { ColorPalette } from 'utils/colorUtils';

const TweetProfileWrapper = styled.div`
  width: 10%;
  height: 100px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-right: 12px;
  padding-top: 4px;
`;

// [REMOVED]
const TestImage = styled.div`
  margin-left: 0;
  width: 48px;
  height: 48px;
  border-radius: ${48 / 2}px;
  background-color: ${ColorPalette.GREEN};
`;

const TweetPostProfile: React.FC = () => {
  return (
    <TweetProfileWrapper>
      <ImageWrapper>
        <TestImage />
      </ImageWrapper>
    </TweetProfileWrapper>
  );
};

export default TweetPostProfile;
