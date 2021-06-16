import React, { useState } from 'react';
import styled from 'styled-components';
import { setTimeout } from 'timers';
import { ColorPalette } from '../../utils/colorUtils';
import ProfileTooltip from '../base/ProfileTooltip';
import Tweet from '../../models/tweet';
import getTweetedTimeGap from '../../utils/getTweetedTimeGap';

const TweetMainTopItem = styled.div`
  width: auto;

  margin: 1px;

  display: inline-block;
`;

const TweetMainTopUsername = styled(TweetMainTopItem)`
  font-weight: bold;
`;

const TweetMainTopUseridTweetedAt = styled(TweetMainTopItem)`
  color: ${ColorPalette.GRAY_70};
`;

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

const TestButton = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid black;
`;

interface TweetMainTopProps {
  tweet: Tweet;
}

const TweetMainTop: React.FC<TweetMainTopProps> = (props) => {
  const { tweet } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>();

  const openProfileTooltip = () => {
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => setIsOpen(true), 800);
    setTimer(newTimer);
    console.log('open');
  };

  const closeProfileTooltip = () => {
    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => setIsOpen(false), 500);
    setTimer(newTimer);
    console.log('close');
  };

  const printOpen = () => {
    console.log(isOpen);
  };

  const elapsed = getTweetedTimeGap(tweet.tweeted_at);

  return (
    <>
      <TestButton onClick={printOpen}>test</TestButton>
      <TweetMainTopContainer>
        <TweetMainTopLeftContainer>
          <TweetMainTopUsername
            onMouseEnter={openProfileTooltip}
            onMouseLeave={closeProfileTooltip}
          >
            {tweet.writer_id}
          </TweetMainTopUsername>
          <TweetMainTopUseridTweetedAt>
            @USERID - {elapsed}
          </TweetMainTopUseridTweetedAt>
        </TweetMainTopLeftContainer>
        <TweetMainTopRightContainer>
          <TweetMainTopItem>more</TweetMainTopItem>
        </TweetMainTopRightContainer>
      </TweetMainTopContainer>
      <ProfileTooltip
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        userid={tweet.writer_id}
        username="USERNAME"
      />
    </>
  );
};

export default TweetMainTop;
