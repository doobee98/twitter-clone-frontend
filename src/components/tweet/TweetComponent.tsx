import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from 'hooks/redux';
import User from 'models/user';
import { fetchUser } from 'modules/userRecord';
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
  }
`;

interface TweetComponentProps {
  tweet: Tweet;
}

const TweetComponent: React.FC<TweetComponentProps> = (props) => {
  const { children, tweet } = props;
  const [user, setUser] = useState<User>();
  const dispatch = useAppDispatch();

  const initTweet = async () => {
    const res = await dispatch(fetchUser(tweet.writer_id));

    await setUser(res.payload as User);
  };

  useEffect(() => {
    initTweet();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <TweetContainer>
      <TweetSide tweet={tweet} user={user} />
      <TweetMain tweet={tweet} user={user} />
    </TweetContainer>
  );
};

export default TweetComponent;
