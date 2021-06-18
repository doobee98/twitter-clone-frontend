import { useAppDispatch } from 'hooks/redux';
import { createTweet, replyTweet } from 'modules/home';
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
  original_tweet_id?: string;
  onCreatePost?: () => void;
}

const TweetPost: React.FC<TweetPostProps> = (props) => {
  const { original_tweet_id, onCreatePost } = props;
  const dispatch = useAppDispatch();

  const handlePost = async (tweetContent: string) => {
    dispatch(
      !original_tweet_id
        ? createTweet({ content: tweetContent })
        : replyTweet({ original_tweet_id, content: tweetContent }),
    );
    if (onCreatePost) onCreatePost();
  };

  return (
    <TweetPostContainer>
      <TweetPostProfile />
      <TweetPostContent onPost={handlePost} />
    </TweetPostContainer>
  );
};

export default TweetPost;
