import React from 'react';
import styled from 'styled-components';
import TweetPostContent from './TweetPostContent';
import TweetPostProfile from './TweetPostProfile';

const TweetPostContainer = styled.div`
  display: flex;
  padding: 8px 14px;
  width: 100%;
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
