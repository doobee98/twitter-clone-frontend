import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useHomeSelector } from 'hooks/redux';
import { fetchFeed } from 'modules/home';
import Icon from 'components/base/Icon';
import { BasicType } from 'utils/iconUtils';
import { ColorPalette } from '../../utils/colorUtils';
import TweetComponent from './TweetComponent';
import useInfinityScroll from '../../hooks/useInfinityScroll';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 400px;
`;

const TweetListContainer = styled.div`
  border: 2px solid ${ColorPalette.SKYBLUE};
`;

const TweetList: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const homeStore = useHomeSelector();
  const dispatch = useAppDispatch();
  const { feed } = homeStore;

  const handleFetchFeed = async () => {
    const res = await dispatch(fetchFeed());

    if (res.type.toString() === 'home/fetchFeed/rejected') {
      setIsError(true);
    }

    setIsLoading(false);
  };

  // INIT FETCH
  useEffect(() => {
    handleFetchFeed();
  }, []);

  // InfinityScroll w/ Throttling
  const timer = useRef<boolean>(false);
  const setTimer = (inputBoolean: boolean) => {
    timer.current = inputBoolean;
  };
  useInfinityScroll(handleFetchFeed, timer, setTimer);

  if (isLoading) {
    return (
      <ErrorContainer>
        <Icon iconType={BasicType.LOAD} iconSize={100} />
      </ErrorContainer>
    );
  }

  if (isError) {
    return (
      <ErrorContainer>
        <Icon iconType={BasicType.ALERT} iconSize={100} />
      </ErrorContainer>
    );
  }

  return (
    <>
      <TweetListContainer>
        {feed.map((tweet) => (
          <TweetComponent key={tweet.tweet_id} tweet={tweet} />
        ))}
      </TweetListContainer>
    </>
  );
};

export default TweetList;
