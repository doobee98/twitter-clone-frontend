import React, { useState } from 'react';
import styled from 'styled-components';
import ProfileTooltip from 'components/base/ProfileTooltip';
import User from 'models/user';
import ProfileImage from '../base/ProfileImage';
import Tweet from '../../models/tweet';

const TweetProfileWrapper = styled.div`
  display: flex;
  width: 50px;
  height: 50px;
  margin: 1px;

  justify-content: center;
  align-items: center;
`;

const TweetSideContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 60px;
`;

interface TweetSideProps {
  tweet: Tweet;
}

const TweetSide: React.FC<TweetSideProps> = (props) => {
  const { tweet } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout>();

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
    <>
      <TweetSideContainer>
        <TweetProfileWrapper
          onMouseEnter={openProfileTooltip}
          onMouseLeave={closeProfileTooltip}
        >
          <ProfileImage userid={tweet.writer_id} username={tweet.writer_name} />
        </TweetProfileWrapper>
        <ProfileTooltip
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          userId={tweet.writer_id}
        />
      </TweetSideContainer>
    </>
  );
};

export default TweetSide;
