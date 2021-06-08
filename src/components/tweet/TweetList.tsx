import React, { useState } from 'react';
import styled from 'styled-components';
import { ColorPalette } from '../../utils/colorUtils';
import TweetModel from '../../models/tweet';
import TweetComponent from './TweetComponent';
import useInfinityScroll from '../../hooks/useInfinityScroll';
import { testTweet } from '../../utils/testTweetUtils';

const TweetListContainer = styled.div`
  border: 2px solid ${ColorPalette.SKYBLUE};
  margin: 20px;
`;

const TweetList: React.FC = () => {
  const initTweetNum = 6;
  const [tweets, setTweets] = useState<TweetModel[]>(
    testTweet.filter((tweet) => tweet.key < initTweetNum),
  );

  useInfinityScroll(testTweet, tweets, setTweets);

  return (
    <TweetListContainer>
      {tweets.map((tweet) => (
        <TweetComponent key={tweet.key} tweet={tweet} />
      ))}
    </TweetListContainer>
  );
};

export default TweetList;
