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
  isReply?: boolean;
  originalTweetId?: string;
  onCreatePost?: () => void;
}

const TweetPost: React.FC<TweetPostProps> = (props) => {
  const { isReply, originalTweetId, onCreatePost } = props;
  const dispatch = useAppDispatch();

  const handlePost = async (tweetContent: string, replyPermission?: string) => {
    dispatch(
      !originalTweetId
        ? createTweet({
            content: tweetContent,
            reply_permission: replyPermission,
          })
        : replyTweet({
            original_tweet_id: originalTweetId,
            content: tweetContent,
            reply_permission: replyPermission,
          }),
    );
    if (onCreatePost) onCreatePost();
  };

  return (
    <TweetPostContainer>
      <TweetPostProfile />
      <TweetPostContent
        placeholder={!isReply ? "What's happening?" : 'Add another Tweet'}
        onPost={handlePost}
      />
    </TweetPostContainer>
  );
};

export default TweetPost;
