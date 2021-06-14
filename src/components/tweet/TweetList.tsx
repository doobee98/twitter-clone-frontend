import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useHomeSelector } from 'hooks/redux';
import { fetchFeed } from 'modules/home';
import { ColorPalette } from '../../utils/colorUtils';
import Tweet from '../../models/tweet';
import TweetComponent from './TweetComponent';
import useInfinityScroll from '../../hooks/useInfinityScroll';

const TweetListContainer = styled.div`
  border: 2px solid ${ColorPalette.SKYBLUE};
  margin: 20px;
`;

const TweetList: React.FC = () => {
  const homeStore = useHomeSelector();
  const dispatch = useAppDispatch();
  const { feed } = homeStore;

  const handleFetchFeed = async () => {
    dispatch(fetchFeed());
  };

  // MAYBE TOBE REFACTORED
  const timer = useRef<boolean>(false);
  const setTimer = (inputBoolean: boolean) => {
    timer.current = inputBoolean;
  };
  useInfinityScroll(handleFetchFeed, timer, setTimer);

  // TO BE REMOVED
  useEffect(() => {
    console.log(feed);
  }, [feed]);

  // INIT FETCH
  useEffect(() => {
    handleFetchFeed();
  }, []);

  return (
    <TweetListContainer>
      {feed.map((tweet) => (
        <TweetComponent key={tweet.tweet_id} tweet={tweet} />
      ))}
    </TweetListContainer>
  );
};

export default TweetList;
