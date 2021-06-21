import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'components/base/Button';
import Icon from 'components/base/Icon';
import { useRootDispatch, useUserRecordSelector } from 'hooks/redux';
import { homeActions } from 'modules/home';
import { ColorPalette, hexToRgbA } from '../../utils/colorUtils';
import Tweet from '../../models/tweet';
import { BasicType, HighlightType } from '../../utils/iconUtils';
import { modalActions } from '../../modules/modal';

const TweetMainBottomContainer = styled.div`
  display: flex;
  margin-top: 10px;
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
  const writer = useUserRecordSelector(
    (state) => state.userRecord[tweet.writer_id],
  );
  const dispatch = useRootDispatch();

  const handleReply = () => {
    const isFollowingWriter = writer?.following_flag;
    if (tweet.reply_permission && !isFollowingWriter) {
      window.alert('reply not permitted!!');
    } else dispatch(modalActions.openReplyModal(tweet));
  };

  const handleRetweet = async () => {
    if (isRetweetFlag) {
      await dispatch(homeActions.unretweetTweet(tweet.tweet_id));
    } else {
      await dispatch(homeActions.retweetTweet(tweet.tweet_id));
    }

    setIsRetweetFlag(!isRetweetFlag);
  };

  const handleLike = async () => {
    if (isLikeFlag) {
      await dispatch(homeActions.dislikeTweet(tweet.tweet_id));
    } else {
      await dispatch(homeActions.likeTweet(tweet.tweet_id));
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
