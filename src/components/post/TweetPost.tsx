import React from 'react';
import styled from 'styled-components';
import { ColorPalette } from 'utils/colorUtils';
import TweetPostContent from './TweetPostContent';
import TweetPostProfile from './TweetPostProfile';

const TweetPostContainer = styled.div`
  display: flex;
  padding: 0px 16px;
  width: 100%;
  border: 1px solid ${ColorPalette.BLACK};
`;

const TweetPost: React.FC = () => {
  return (
    <TweetPostContainer>
      <TweetPostProfile />
      <TweetPostContent />
    </TweetPostContainer>
  );
};

export default TweetPost;
