import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { setTimeout } from 'timers';
import Icon from 'components/base/Icon';
import { BasicType } from 'utils/iconUtils';
import { ColorPalette, hexToRgbA } from '../../utils/colorUtils';
import ProfileTooltip from '../base/ProfileTooltip';
import Tweet from '../../models/tweet';
import { getTweetedTimeGap } from '../../utils';
import TweetMoreDropdown from './TweetMoreDropdown';

const TweetMainTopItem = styled.div`
  width: auto;
  margin: 1px;
  display: inline-block;
`;

const TweetMainTopUsername = styled(TweetMainTopItem)`
  font-weight: bold;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
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

const TweetMainTopMore = styled(TweetMainTopItem)`
  &:hover {
    cursor: pointer;
  }
`;

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

const TweetMainTopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin: 1px;
`;

interface TweetMainTopDescriptionProps {
  tweet: Tweet;
}

export const TweetMainTopDescription: React.FC<TweetMainTopDescriptionProps> = (
  props,
) => {
  const { tweet } = props;
  const elapsed = getTweetedTimeGap(tweet.tweeted_at);
  return (
    <>
      <TweetMainTopLeftContainer>
        <TweetMainTopUsername>USERNAME</TweetMainTopUsername>
        <TweetMainTopUseridTweetedAt>
          @{tweet.writer_id} - {elapsed}
        </TweetMainTopUseridTweetedAt>
      </TweetMainTopLeftContainer>
    </>
  );
};

interface TweetMainTopProps {
  tweet: Tweet;
  hideInteraction?: boolean;
}

const TweetMainTop: React.FC<TweetMainTopProps> = (props) => {
  const { tweet, hideInteraction } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [isMore, setIsMore] = useState(false);
  const history = useHistory();

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

  const handleMore = () => {
    setIsMore(!isMore);
  };

  const goToProfilePage = () => {
    history.push(`/${tweet.writer_id}`);
  };

  const elapsed = getTweetedTimeGap(tweet.tweeted_at);

  return (
    <>
      <TweetMainTopContainer>
        <TweetMainTopLeftContainer>
          <TweetMainTopUsername
            onMouseEnter={openProfileTooltip}
            onMouseLeave={closeProfileTooltip}
            onClick={goToProfilePage}
          >
            {tweet.writer_name}
          </TweetMainTopUsername>
          <TweetMainTopUseridTweetedAt>
            @{tweet.writer_id} - {elapsed}
          </TweetMainTopUseridTweetedAt>
        </TweetMainTopLeftContainer>
        {!hideInteraction && (
          <TweetMainTopRightContainer>
            <TweetMainTopMore onClick={handleMore}>
              <HoverArea highlightColor={ColorPalette.SKYBLUE}>
                <HoverIcon
                  iconType={isMore ? BasicType.CANCEL : BasicType.MORE}
                />
              </HoverArea>
            </TweetMainTopMore>
            {isMore && <TweetMoreDropdown tweet={tweet} />}
          </TweetMainTopRightContainer>
        )}
      </TweetMainTopContainer>
      <ProfileTooltip
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        userId={tweet.writer_id}
      />
    </>
  );
};

export default TweetMainTop;
