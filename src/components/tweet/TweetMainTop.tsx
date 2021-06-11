import React, { useState } from 'react';
import styled from 'styled-components';
import { ColorPalette } from '../../utils/colorUtils';
import TweetModel from '../../models/tweet';
import ProfileHover from '../base/ProfileHover';

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
  tweet: TweetModel;
}

const TweetMainTop: React.FC<TweetMainTopProps> = (props) => {
  const { children, tweet } = props;
  const [isOpen, setIsOpen] = useState(false);

  const openProfileHover = () => {
    setIsOpen(true);
  };

  const closeProfileHover = () => {
    setIsOpen(false);
  };
  // <TweetMainTopItem>isOffical</TweetMainTopItem>   ---> should we? after next meeting
  return (
    <>
      <TweetMainTopContainer>
        <TweetMainTopLeftContainer>
          <TweetMainTopUsername
            onMouseEnter={openProfileHover}
            onMouseLeave={closeProfileHover}
          >
            {tweet.user}
          </TweetMainTopUsername>
          <TweetMainTopUseridTweetedAt>
            @{tweet.key} - tweetedAt
          </TweetMainTopUseridTweetedAt>
        </TweetMainTopLeftContainer>
        <TweetMainTopRightContainer>
          <TweetMainTopItem>more</TweetMainTopItem>
        </TweetMainTopRightContainer>
      </TweetMainTopContainer>
      <ProfileHover isOpen={isOpen} userid={tweet.user} username={tweet.user} />
    </>
  );
};

export default TweetMainTop;
