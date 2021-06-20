import Icon from 'components/base/Icon';
import React, { useState } from 'react';
import styled from 'styled-components';
import { ColorPalette } from 'utils/colorUtils';
import { BasicType } from 'utils/iconUtils';
import Tweet from '../../models/tweet';

const TweetHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  padding: 1px 50px;

  color: ${ColorPalette.GRAY_96};

  font-weight: bold;
`;

const TweetHeaderItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface TweetHeaderProps {
  tweet: Tweet;
}

const TweetHeader: React.FC<TweetHeaderProps> = (props) => {
  const { tweet } = props;

  // TO BE REMOVED: BUG FIXXING....
  // tweet에는 retweet_writer_id가 잘 출력되는데
  // retweet)wrtier_id만 출력하려고하면 undefined네요..!!!
  console.log(tweet);
  console.log(tweet.type);
  console.log(tweet.retweet_wrtier_id);

  return (
    <>
      <TweetHeaderContainer>
        <TweetHeaderItemWrapper>
          <Icon iconType={BasicType.RETWEET} />
        </TweetHeaderItemWrapper>
        <TweetHeaderItemWrapper>
          {`${tweet.retweet_wrtier_id}`} Retweeted
        </TweetHeaderItemWrapper>
      </TweetHeaderContainer>
    </>
  );
};

export default TweetHeader;
