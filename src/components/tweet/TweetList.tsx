import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useHomeSelector } from 'hooks/redux';
import { fetchFeed } from 'modules/home';
import { ColorPalette } from '../../utils/colorUtils';
import TweetModel, { Tweet } from '../../models/tweet';
import TweetComponent from './TweetComponent';
import useInfinityScroll from '../../hooks/useInfinityScroll';
import { testTweet } from '../../utils/testTweetUtils';

const TweetListContainer = styled.div`
  border: 2px solid ${ColorPalette.SKYBLUE};
  margin: 20px;
`;

const TweetList: React.FC = () => {
  const [isInit, setIsInit] = useState(true);

  const homeStore = useHomeSelector();
  const dispatch = useAppDispatch();
  const { feed } = homeStore;

  const handleFetchFeed = async () => {
    dispatch(fetchFeed());
  };

  // init fetch
  if (isInit) {
    setIsInit(false);
    handleFetchFeed();
  }

  useInfinityScroll(feed, handleFetchFeed);

  // TO BE REMOVED
  useEffect(() => {
    console.log(feed);
  }, [feed]);

  return (
    <TweetListContainer>
      {feed.map((tweet) => (
        <TweetComponent key={tweet.tweet_id} tweet={tweet} />
      ))}
    </TweetListContainer>
  );
};

export default TweetList;
