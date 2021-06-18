import React from 'react';
import styled from 'styled-components';
import TweetPostContent from './TweetPostContent';
import TweetPostProfile from './TweetPostProfile';

const TweetPostContainer = styled.div`
  display: flex;
  padding: 8px 14px;
  width: 100%;
`;

interface TweetPostProps {
  onCreateTweet?: () => void;
}

const TweetPost: React.FC<TweetPostProps> = (props) => {
  const { onCreateTweet } = props;
  return (
    <TweetPostContainer>
      <TweetPostProfile />
      <TweetPostContent onCreateTweet={onCreateTweet} />
    </TweetPostContainer>
  );
};

export default TweetPost;
