import User from 'models/user';
import React from 'react';
import styled from 'styled-components';
import Tweet from '../../models/tweet';

const TweetMainContentWrapper = styled.div`
  padding: 1px;
  margin: 1px;
`;

const TweetMainImageWrapper = styled.div`
  height: 100px;

  border: 1px solid;
  margin: 1px;
`;

const TweetMainCenterContainer = styled.div`
  margin: 1px;
`;

interface TweetMainCenterProps {
  tweet: Tweet;
  user: User;
}

const TweetMainCenter: React.FC<TweetMainCenterProps> = (props) => {
  const { children, tweet, user } = props;

  return (
    <TweetMainCenterContainer>
      <TweetMainContentWrapper>{tweet.content}</TweetMainContentWrapper>
      <TweetMainImageWrapper>{tweet.image_src_list}</TweetMainImageWrapper>
    </TweetMainCenterContainer>
  );
};

export default TweetMainCenter;
