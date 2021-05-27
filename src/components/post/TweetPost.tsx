import React from 'react';
import styled from 'styled-components';
import { ColorPalette } from 'utils/colorUtils';
import TweetPostContent from './TweetPostContent';
import TweetPostProfile from './TweetPostProfile';

const PostContainer = styled.div`
  display: flex;
  padding: 0px 16px 4px 16px;
  width: 100%;
  border: 1px solid ${ColorPalette.BLACK};
`;

const TweetPost: React.FC = () => {
  return (
    <PostContainer>
      <TweetPostProfile />
      <TweetPostContent />
    </PostContainer>
  );
};

export default TweetPost;
