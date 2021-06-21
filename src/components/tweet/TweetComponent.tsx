import React from 'react';
import styled from 'styled-components';
import Tweet from '../../models/tweet';
import TweetSide from './TweetSide';
import TweetMain from './TweetMain';
import TweetHeader from './TweetHeader';

const TweetContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-collapse: collapse;
`;

const TweetWrapper = styled.div`
  display: flex;
`;

interface TweetComponentProps {
  tweet: Tweet;
}

const TweetComponent: React.FC<TweetComponentProps> = (props) => {
  const { tweet } = props;

  return (
    <TweetContainer>
      <TweetWrapper>
        {tweet.type === 'retweet' && <TweetHeader tweet={tweet} />}
      </TweetWrapper>
      <TweetWrapper>
        <TweetSide tweet={tweet} />
        <TweetMain tweet={tweet} />
      </TweetWrapper>
    </TweetContainer>
  );
};

export default TweetComponent;
