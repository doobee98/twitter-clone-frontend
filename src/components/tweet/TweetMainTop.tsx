import React from 'react';
import styled from 'styled-components';
import { ColorPalette } from '../../utils/colorUtils';
import TweetModel from '../../models/tweet';

const TweetMainTopItem = styled.div`
  width: auto;

  margin: 1px;

  display: inline-block;

  &.username {
    font-weight: bold;
  }

  &.userid_tweetedAt {
    color: ${ColorPalette.GRAY_70};
  }
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
  tweet: TweetModel;
}

const TweetMainTop: React.FC<TweetMainTopProps> = (props) => {
  const { children, tweet } = props;

  // <TweetMainTopItem>isOffical</TweetMainTopItem>   ---> should we? after next meeting
  return (
    <TweetMainTopContainer>
      <TweetMainTopLeftContainer>
        <TweetMainTopItem className="username">{tweet.user}</TweetMainTopItem>
        <TweetMainTopItem className="userid_tweetedAt">
          @{tweet.key} - tweetedAt
        </TweetMainTopItem>
      </TweetMainTopLeftContainer>
      <TweetMainTopRightContainer>
        <TweetMainTopItem>more</TweetMainTopItem>
      </TweetMainTopRightContainer>
    </TweetMainTopContainer>
  );
};

export default TweetMainTop;
