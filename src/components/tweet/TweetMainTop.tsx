import React from 'react';
import styled from 'styled-components';
import { ColorPalette } from '../../utils/colorUtils';
import Tweet from '../../models/tweet';
import getTweetedTimeGap from '../../utils/getTweetedTimeGap';

const TweetMainTopItem = styled.div`
  width: auto;

  margin: 1px;

  display: inline-block;
`;

// NEED TO BE RENAMED : awful long name
const TweetMainTopUsername = styled(TweetMainTopItem)`
  font-weight: bold;
`;

const TweetMainTopUseridTweetedAt = styled(TweetMainTopItem)`
  color: ${ColorPalette.GRAY_70};
`;

// TO BE REFACTORED : awful naming, awful structure
const TweetMainTopLeftContainer = styled.div`
  display: inline-block;
`;

const TweetMainTopRightContainer = styled.div`
  display: inline-block;
`;

const TweetMainTopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin: 1px;
`;

interface TweetMainTopProps {
  tweet: Tweet;
}

const TweetMainTop: React.FC<TweetMainTopProps> = (props) => {
  const { children, tweet } = props;

  const elapsed = getTweetedTimeGap(tweet.tweeted_at);

  return (
    <TweetMainTopContainer>
      <TweetMainTopLeftContainer>
        <TweetMainTopUsername>{tweet.writer_id}</TweetMainTopUsername>
        <TweetMainTopUseridTweetedAt>
          @{tweet.writer_id} - {elapsed}
        </TweetMainTopUseridTweetedAt>
      </TweetMainTopLeftContainer>
      <TweetMainTopRightContainer>
        <TweetMainTopItem>more</TweetMainTopItem>
      </TweetMainTopRightContainer>
    </TweetMainTopContainer>
  );
};

export default TweetMainTop;
