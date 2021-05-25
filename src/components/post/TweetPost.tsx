import React from 'react';
import styled from 'styled-components';
import { ColorPalette } from 'utils/colorUtils';
import PostContent from './PostContent';
import PostProfile from './PostProfile';

const PostContainer = styled.div`
  display: flex;
  padding: 0px 16px 4px 16px;
  width: 100%;
  border: 1px solid ${ColorPalette.BLACK};
`;

const TweetPost: React.FC = () => {
  return (
    <PostContainer>
      <PostProfile />
      <PostContent />
    </PostContainer>
  );
};

export default TweetPost;
