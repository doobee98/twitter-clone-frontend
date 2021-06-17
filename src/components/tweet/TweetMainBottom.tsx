import React from 'react';
import styled from 'styled-components';
import Button from 'components/base/Button';
import Icon from 'components/base/Icon';
import User from 'models/user';
import { useAppDispatch } from 'hooks/redux';
import { dislikeTweet, likeTweet } from 'modules/home';
import { ColorPalette, hexToRgbA } from '../../utils/colorUtils';
import Tweet from '../../models/tweet';
import { BasicType } from '../../utils/iconUtils';

const TweetMainBottomContainer = styled.div`
  display: flex;
  margin: 0 1px;
`;

const TweetMainBottomItem = styled(Button)`
  padding: 0;
  width: 25%;
  color: ${ColorPalette.GRAY_70};
  justify-content: flex-start;
  align-items: center;
`;

// change component order to avoid hoisting
const HoverIcon = styled(Icon)`
  width: 30px;
  height: 30px;
  border-radius: 9999px;
`;
interface HoverAreaProps {
  highlightColor: string;
}

const HoverArea = styled.div<HoverAreaProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  &:hover {
    color: ${(props) => props.highlightColor};

    ${HoverIcon} {
      background-color: ${(props) => hexToRgbA(props.highlightColor, 0.1)};
    }
  }
`;

const HoverText = styled.div`
  padding: 0 12px;
  font-size: 13px;
`;

interface TweetMainBottomProps {
  tweet: Tweet;
  user: User;
}

const TweetMainBottom: React.FC<TweetMainBottomProps> = (props) => {
  const { tweet, user } = props;
  const dispatch = useAppDispatch();

  const handleReply = () => {
    // TODO
  };

  const handleRetweet = () => {
    // TODO
  };

  const handleLike = async () => {
    if (tweet.like_flag) {
      await dispatch(dislikeTweet(tweet.tweet_id));
    } else {
      await dispatch(likeTweet(tweet.tweet_id));
    }

    console.log(tweet);
  };

  const handleShare = () => {
    // TODO
  };

  return (
    <TweetMainBottomContainer>
      <TweetMainBottomItem onClick={handleReply}>
        <HoverArea highlightColor={ColorPalette.SKYBLUE}>
          <HoverIcon iconType={BasicType.REPLY} iconSize={16} />
          <HoverText>{tweet.reply_count}</HoverText>
        </HoverArea>
      </TweetMainBottomItem>
      <TweetMainBottomItem onClick={handleRetweet}>
        <HoverArea highlightColor={ColorPalette.GREEN}>
          <HoverIcon iconType={BasicType.RETWEET} iconSize={16} />
          <HoverText>{tweet.retweet_count}</HoverText>
        </HoverArea>
      </TweetMainBottomItem>
      <TweetMainBottomItem onClick={handleLike}>
        <HoverArea highlightColor={ColorPalette.MAGENTA}>
          <HoverIcon iconType={BasicType.LIKE} iconSize={16} />
          <HoverText>{tweet.like_count}</HoverText>
        </HoverArea>
      </TweetMainBottomItem>
      <TweetMainBottomItem onClick={handleShare}>
        <HoverArea highlightColor={ColorPalette.SKYBLUE}>
          <HoverIcon iconType={BasicType.SHARE} iconSize={16} />
        </HoverArea>
      </TweetMainBottomItem>
    </TweetMainBottomContainer>
  );
};

export default TweetMainBottom;
