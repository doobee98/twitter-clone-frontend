import React, { useState } from 'react';
import styled from 'styled-components';
import { ColorPalette } from '../../utils/colorUtils';
import TweetModel from '../../models/tweet';
import { BasicType } from '../../utils/iconUtils';
import NavItem from '../base/NavItem';

const TweetBottomIcon = styled(NavItem)`
  align-items: center;
  justify-content: center;

  & button {
    width: 25px;
    height: 25px;
    padding: 0px;
    margin: 0px;
  }

  & svg {
    width: 20px;
    height: 20px;
  }

  color: ${ColorPalette.SKYBLUE};
`;

const TweetBottomItemWrapper = styled.div`
  display: flex;

  align-items: center;
`;

const TweetBottomContainer = styled.div`
  display: flex;

  margin: 1px;

  justify-content: space-around;
`;

interface TweetBottomProps {
  tweet: TweetModel;
}

const TweetMainBottom: React.FC<TweetBottomProps> = (props) => {
  const { children, tweet } = props;
  const [isShareActive, setIsShareActive] = useState<boolean>(false);

  const shareClick = () => {
    setIsShareActive(!isShareActive);
    console.log(isShareActive);
  };

  const newTweetModal = () => {
    // TO DO
    console.log('newTweetModal');
  };

  const increaseRetweets = () => {
    tweet.retweets += 1;
  };

  const increaseLikes = () => {
    tweet.likes += 1;
  };

  return (
    <TweetBottomContainer>
      <TweetBottomItemWrapper>
        <TweetBottomIcon iconType={BasicType.REPLY} />
        {tweet.comments}
      </TweetBottomItemWrapper>
      <TweetBottomItemWrapper>
        <TweetBottomIcon iconType={BasicType.RETWEET} />
        {tweet.retweets}
      </TweetBottomItemWrapper>
      <TweetBottomItemWrapper>
        <TweetBottomIcon iconType={BasicType.LIKE} />
        {tweet.likes}
      </TweetBottomItemWrapper>
      <TweetBottomItemWrapper>
        <TweetBottomIcon iconType={BasicType.SHARE} />
      </TweetBottomItemWrapper>
    </TweetBottomContainer>
  );
};

export default TweetMainBottom;
