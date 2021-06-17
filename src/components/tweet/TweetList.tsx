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
  margin: 10px;
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
  };

  // INIT FETCH
  const LOADING_TIMER = 2000;
  useEffect(() => {
    handleFetchFeed();
    setTimeout(() => setIsLoading(false), LOADING_TIMER);
  }, []);

  // InfinityScroll w/ Throttling
  const timer = useRef<boolean>(false);
  const setTimer = (inputBoolean: boolean) => {
    timer.current = inputBoolean;
  };
  useInfinityScroll(handleFetchFeed, timer, setTimer);

  return (
    <>
      {isLoading || isError ? (
        <ErrorContainer>
          {(isLoading && <Icon iconType={BasicType.LOAD} iconSize={100} />) ||
            (isError && <Icon iconType={BasicType.ALERT} iconSize={100} />)}
        </ErrorContainer>
      ) : (
        <TweetListContainer>
          {feed.map((tweet, index) => (
            <TweetComponent key={tweet.tweet_id} tweet={tweet} />
          ))}
        </TweetListContainer>
      )}
    </>
  );
};

export default TweetList;
