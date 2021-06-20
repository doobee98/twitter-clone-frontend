import Icon from 'components/base/Icon';
import React, { useState } from 'react';
import styled from 'styled-components';
import { ColorPalette } from 'utils/colorUtils';
import { BasicType } from 'utils/iconUtils';
import Tweet from '../../models/tweet';

const TweetHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;

  padding: 0px 10px;
  border: 1px solid black;

  color: ${ColorPalette.GRAY_E6};
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

  return (
    <>
      <TweetHeaderContainer>
        <TweetHeaderItemWrapper>
          <Icon iconType={BasicType.RETWEET} />
        </TweetHeaderItemWrapper>
        <TweetHeaderItemWrapper>
          ${tweet.retweet_wrtier_id} Retweeted
        </TweetHeaderItemWrapper>
      </TweetHeaderContainer>
    </>
  );
};

export default TweetHeader;
