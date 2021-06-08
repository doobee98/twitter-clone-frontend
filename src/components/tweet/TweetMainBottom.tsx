import React, { useState } from 'react';
import styled from 'styled-components';
import { ColorPalette } from '../../utils/colorUtils';
import TweetModel from '../../models/tweet';
import { BasicType } from '../../utils/iconUtils';
import NavItem from '../base/NavItem';

const TweetMainBottomIcon = styled(NavItem)`
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

const TweetMainBottomItemWrapper = styled.div`
  display: flex;

  align-items: center;
`;

const TweetMainBottomContainer = styled.div`
  display: flex;

  margin: 1px;

  justify-content: space-around;
`;

interface TweetMainBottomProps {
  tweet: TweetModel;
}

const TweetMainBottom: React.FC<TweetMainBottomProps> = (props) => {
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
    <TweetMainBottomContainer>
      <TweetMainBottomItemWrapper>
        <TweetMainBottomIcon iconType={BasicType.REPLY} />
        {tweet.comments}
      </TweetMainBottomItemWrapper>
      <TweetMainBottomItemWrapper>
        <TweetMainBottomIcon iconType={BasicType.RETWEET} />
        {tweet.retweets}
      </TweetMainBottomItemWrapper>
      <TweetMainBottomItemWrapper>
        <TweetMainBottomIcon iconType={BasicType.LIKE} />
        {tweet.likes}
      </TweetMainBottomItemWrapper>
      <TweetMainBottomItemWrapper>
        <TweetMainBottomIcon iconType={BasicType.SHARE} />
      </TweetMainBottomItemWrapper>
    </TweetMainBottomContainer>
  );
};

export default TweetMainBottom;
