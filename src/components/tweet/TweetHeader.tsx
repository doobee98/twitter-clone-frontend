import React, { useState } from 'react';
import styled from 'styled-components';
import Icon from 'components/base/Icon';
import ProfileTooltip from 'components/base/ProfileTooltip';
import { ColorPalette } from 'utils/colorUtils';
import { BasicType } from 'utils/iconUtils';
import Tweet from '../../models/tweet';

const TweetHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  margin-left: 45px;
  margin-bottom: 7px;
`;

const TweetHeaderItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: 4px;

  color: ${ColorPalette.GRAY_96};

  font-weight: bold;
  font-size: 12px;
`;

const TweetHeaderTextWrapper = styled(TweetHeaderItemWrapper)`
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

interface TweetHeaderProps {
  tweet: Tweet;
}

const TweetHeader: React.FC<TweetHeaderProps> = (props) => {
  const { tweet } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  if (!tweet.retweet_writer_id) {
    return null;
  }

  const openProfileTooltip = () => {
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => setIsOpen(true), 500);
    setTimer(newTimer);
  };

  const closeProfileTooltip = () => {
    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => setIsOpen(false), 500);
    setTimer(newTimer);
  };

  return (
    <TweetHeaderContainer>
      <TweetHeaderItemWrapper>
        <Icon iconType={BasicType.RETWEET} iconSize={14} />
      </TweetHeaderItemWrapper>
      <TweetHeaderTextWrapper
        onMouseEnter={openProfileTooltip}
        onMouseLeave={closeProfileTooltip}
      >
        {tweet.retweet_writer_id} Retweeted
      </TweetHeaderTextWrapper>
      <ProfileTooltip
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        userId={tweet.retweet_writer_id}
      />
    </TweetHeaderContainer>
  );
};

export default TweetHeader;
