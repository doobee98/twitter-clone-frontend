import { useAppDispatch, useAuthSelector } from 'hooks/redux';
import { createTweet, replyTweet } from 'modules/home';
import React from 'react';
import styled from 'styled-components';
import TweetPostContent from './TweetPostContent';
import TweetPostProfile from './TweetPostProfile';

const TweetPostContainer = styled.div`
  display: flex;
  padding: 8px 10px;
  margin: 0px -20px;
  width: 120%;
`;

interface TweetPostProps {
  isReply?: boolean;
  originalTweetId?: string;
  onCreatePost?: () => void;
}

const TweetPost: React.FC<TweetPostProps> = (props) => {
  const { isReply, originalTweetId, onCreatePost } = props;
  const dispatch = useAppDispatch();
  const authStore = useAuthSelector();
  const { currentUser } = authStore;

  const handlePost = async (tweetContent: string) => {
    dispatch(
      !originalTweetId
        ? createTweet({ content: tweetContent })
        : replyTweet({
            original_tweet_id: originalTweetId,
            content: tweetContent,
          }),
    );
    if (onCreatePost) onCreatePost();
  };

  if (!currentUser) return null;
  return (
    <TweetPostContainer>
      <TweetPostProfile currentUser={currentUser} />
      <TweetPostContent
        placeholder={!isReply ? "What's happening?" : 'Add another Tweet'}
        onPost={handlePost}
      />
    </TweetPostContainer>
  );
};

export default TweetPost;
