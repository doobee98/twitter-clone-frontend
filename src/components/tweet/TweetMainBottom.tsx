import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Button from 'components/base/Button';
import Icon from 'components/base/Icon';
import { useAppDispatch } from 'hooks/redux';
import {
  dislikeTweet,
  likeTweet,
  retweetTweet,
  unretweetTweet,
} from 'modules/home';
import { ColorPalette, hexToRgbA } from '../../utils/colorUtils';
import Tweet from '../../models/tweet';
import { BasicType, HighlightType } from '../../utils/iconUtils';
import { openReplyModal } from '../../modules/modal';

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

const HoverIcon = styled(Icon)`
  width: 30px;
  height: 30px;
  border-radius: 9999px;
`;

interface HoverAreaProps {
  highlightColor: string;
  isLikeFlag?: boolean;
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

  ${HoverIcon} {
    color: ${(props) => props.isLikeFlag && props.highlightColor};
  }
`;

interface HoverTextProps {
  isLikeFlag?: boolean;
  highlightColor?: string;
}

const HoverText = styled.div<HoverTextProps>`
  padding: 0 12px;
  font-size: 13px;

  color: ${(props) => props.isLikeFlag && props.highlightColor};
`;

interface TweetMainBottomProps {
  tweet: Tweet;
}

const TweetMainBottom: React.FC<TweetMainBottomProps> = (props) => {
  const { tweet } = props;
  const [isLikeFlag, setIsLikeFlag] = useState<boolean>(tweet.like_flag);
  const [isRetweetFlag, setIsRetweetFlag] = useState<boolean>(
    tweet.retweet_flag,
  );
  const dispatch = useAppDispatch();

  const dispatchPopup = useAppDispatch();

  const handleReply = () => {
    dispatchPopup(openReplyModal(tweet));
  };

  const handleRetweet = async () => {
    // TODO
    if (isRetweetFlag) {
      await dispatch(unretweetTweet(tweet.tweet_id));
    } else {
      await dispatch(retweetTweet(tweet.tweet_id));
    }

    setIsRetweetFlag(!isRetweetFlag);
  };

  const handleLike = async () => {
    if (isLikeFlag) {
      await dispatch(dislikeTweet(tweet.tweet_id));
    } else {
      await dispatch(likeTweet(tweet.tweet_id));
    }

    setIsLikeFlag(!isLikeFlag);
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
        <HoverArea
          highlightColor={ColorPalette.GREEN}
          isLikeFlag={isRetweetFlag}
        >
          <HoverIcon
            iconType={BasicType.RETWEET}
            iconSize={16}
            isHighlighted={!isRetweetFlag}
          />
          <HoverText
            isLikeFlag={isRetweetFlag}
            highlightColor={ColorPalette.GREEN}
          >
            {tweet.retweet_count}
          </HoverText>
        </HoverArea>
      </TweetMainBottomItem>
      <TweetMainBottomItem onClick={handleLike}>
        <HoverArea
          highlightColor={ColorPalette.MAGENTA}
          isLikeFlag={isLikeFlag}
        >
          <HoverIcon
            iconType={HighlightType.LIKE}
            iconSize={16}
            isHighlighted={!isLikeFlag}
          />
          <HoverText
            isLikeFlag={isLikeFlag}
            highlightColor={ColorPalette.MAGENTA}
          >
            {tweet.like_count}
          </HoverText>
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
