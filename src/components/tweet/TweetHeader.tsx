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
  padding: 7px 50px;

  color: ${ColorPalette.GRAY_96};

  font-weight: bold;
  font-size: 12px;
`;

const TweetHeaderItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: 4px;
`;

interface TweetHeaderProps {
  tweet: Tweet;
}

const TweetHeader: React.FC<TweetHeaderProps> = (props) => {
  const { tweet } = props;

  return (
    <TweetHeaderContainer>
      <TweetHeaderItemWrapper>
        <Icon iconType={BasicType.RETWEET} iconSize={14} />
      </TweetHeaderItemWrapper>
      <TweetHeaderItemWrapper>
        {tweet.retweet_writer_id} Retweeted
      </TweetHeaderItemWrapper>
    </TweetHeaderContainer>
  );
};

export default TweetHeader;
