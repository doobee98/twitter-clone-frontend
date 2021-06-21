import React, { useRef } from 'react';
import styled from 'styled-components';
import Icon from 'components/base/Icon';
import { BasicType } from 'utils/iconUtils';
import { ContentSection } from 'components/base/ContentTemplate';
import { ColorPalette } from 'utils/colorUtils';
import TweetComponent from './TweetComponent';
import useInfinityScroll from '../../hooks/useInfinityScroll';
import Tweet from '../../models/tweet';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 400px;
`;

const TweetSection = styled(ContentSection)`
  padding-bottom: 5px;

  &:hover {
    background-color: ${ColorPalette.GRAY_F9};
  }
`;

interface TweetListProps {
  feed: Tweet[];
  handleFetchFeed: () => Promise<void>;
  isLoading: boolean;
  isError: boolean;
}

const TweetList: React.FC<TweetListProps> = (props) => {
  const { feed, handleFetchFeed, isLoading, isError } = props;

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
      {feed.map((tweet) => (
        <TweetSection key={`${tweet.type}-${tweet.tweet_id}`}>
          <TweetComponent tweet={tweet} />
        </TweetSection>
      ))}
    </>
  );
};

export default TweetList;
