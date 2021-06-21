import React from 'react';
import styled from 'styled-components';
import { useRootDispatch, useAuthSelector } from 'hooks/redux';
import { homeActions } from 'modules/home';
import TweetPostContent from './TweetPostContent';
import TweetPostProfile from './TweetPostProfile';

const TweetPostContainer = styled.div`
  display: flex;
  width: 100%;
`;

interface TweetPostProps {
  isReply?: boolean;
  originalTweetId?: string;
  onCreatePost?: () => void;
}

const TweetPost: React.FC<TweetPostProps> = (props) => {
  const { isReply, originalTweetId, onCreatePost } = props;
  const dispatch = useRootDispatch();
  const currentUser = useAuthSelector((state) => state.currentUser);

  const handlePost = async (
    tweetContent: string,
    replyPermission?: 'follower',
  ) => {
    dispatch(
      !originalTweetId
        ? homeActions.createTweet({
            content: tweetContent,
            reply_permission: replyPermission,
          })
        : homeActions.replyTweet({
            original_tweet_id: originalTweetId,
            content: tweetContent,
            reply_permission: replyPermission,
          }),
    );
    if (onCreatePost) onCreatePost();
  };

  if (!currentUser) return null;

  return (
    <TweetPostContainer>
      <TweetPostProfile currentUser={currentUser} />
      <TweetPostContent
        placeholder={!isReply ? "What's happening?" : 'Tweet your reply'}
        onPost={handlePost}
      />
    </TweetPostContainer>
  );
};

export default TweetPost;
