import React, { useState } from 'react';
import ProfileTooltip from 'components/base/ProfileTooltip';
import styled from 'styled-components';
import TweetModel from '../../models/tweet';
import Profile from '../base/Profile';

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
  tweet: TweetModel;
}

const TweetSide: React.FC<TweetSideProps> = (props) => {
  const { tweet } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  const openProfileTooltip = () => {
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => setIsOpen(true), 800);
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
          <Profile userid={tweet.user} username={tweet.user} />
        </TweetProfileWrapper>
        <ProfileTooltip
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          userid={tweet.user}
          username={tweet.user}
        />
      </TweetSideContainer>
    </>
  );
};

export default TweetSide;
