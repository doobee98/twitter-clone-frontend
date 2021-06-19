import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from 'hooks/redux';
import User from 'models/user';
import { fetchUser, getUser } from 'modules/userRecord';
import { ColorPalette } from '../../utils/colorUtils';
import Tweet from '../../models/tweet';
import TweetSide from './TweetSide';
import TweetMain from './TweetMain';

const TweetContainer = styled.div`
  display: flex;

  padding: 2px 2px 4px;
  border-bottom: 0.5px solid ${ColorPalette.GRAY_E6};
  border-collapse;

  &:hover {
    color: ${ColorPalette.SKYBLUE};
    background-color: ${ColorPalette.GRAY_E6};
  }
`;

interface TweetComponentProps {
  tweet: Tweet;
}

const TweetComponent: React.FC<TweetComponentProps> = (props) => {
  const { tweet } = props;

  const dispatch = useAppDispatch();

  // const initTweet = async () => {
  //   const res = await dispatch(getUser(tweet.writer_id));

  //   await setUser(res.payload as User);
  // };

  // useEffect(() => {
  //   initTweet();
  // }, []);

  return (
    <TweetContainer>
      <TweetSide tweet={tweet} />
      <TweetMain tweet={tweet} />
    </TweetContainer>
  );
};

export default TweetComponent;
