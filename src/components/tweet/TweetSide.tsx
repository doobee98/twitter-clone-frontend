import React, { useState } from 'react';
import ProfileTooltip from 'components/base/ProfileTooltip';
import styled from 'styled-components';
import User from 'models/user';
import Profile from '../base/Profile';
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
  user: User;
}

const TweetSide: React.FC<TweetSideProps> = (props) => {
  const { tweet, user } = props;
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
          <Profile userid={tweet.writer_id} username={user.username} />
        </TweetProfileWrapper>
        <ProfileTooltip isOpen={isOpen} setIsOpen={setIsOpen} user={user} />
      </TweetSideContainer>
    </>
  );
};

export default TweetSide;
