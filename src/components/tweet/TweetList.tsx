import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { ColorPalette } from '../../utils/colorUtils';
import TweetModel from '../../models/tweet';
import TweetSide from './TweetSide';
import TweetMain from './TweetMain';
import useInfinityScroll from '../../hooks/useInfinityScroll';
import { testTweet } from '../../utils/testTweetUtils';

const TweetWrapper = styled.div`
  display: flex;

  padding: 2px 2px 4px;
  border: 2px solid;
  margin: 1px 10px 5px;

  cursor: pointer;

  &:hover {
    background-color: ${ColorPalette.GRAY_80};
  }
`;

const TweetListContainer = styled.div`
  border: 2px solid ${ColorPalette.SKYBLUE};

  margin-top 20px;
`;

const TweetList: React.FC = () => {
  const initTweetNum = 6;
  const [tweets, setTweets] = useState<TweetModel[]>(
    testTweet.filter((tweet) => tweet.key < initTweetNum),
  );

  const history = useHistory();

  const goToTweet = (tweetLink: string) => {
    // TO BE ROMVED
    console.log('list');

    history.push(tweetLink);
  };

  useInfinityScroll(testTweet, tweets, setTweets);

  return (
    <TweetListContainer>
      {tweets.map((tweet) => (
        <TweetWrapper
          key={tweet.key}
          onClick={() => goToTweet(`/${tweet.user}/status/${tweet.key}`)}
        >
          <TweetSide tweet={tweet} />
          <TweetMain tweet={tweet} />
        </TweetWrapper>
      ))}
    </TweetListContainer>
  );
};

export default TweetList;
