import React from 'react';
import styled from 'styled-components';
import User from 'models/user';
import Tweet from '../../models/tweet';
import TweetMainTop from './TweetMainTop';
import TweetMainCenter from './TweetMainCenter';
import TweetMainBottom from './TweetMainBottom';

const TweetMainContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;

  margin-right: 2px;

  display: inline-block;
  vertical-align: top;
`;

interface TweetMainProps {
  tweet: Tweet;
  user: User;
}

const TweetMain: React.FC<TweetMainProps> = (props) => {
  const { tweet, user } = props;

  return (
    <TweetMainContainer>
      <TweetMainTop tweet={tweet} user={user} />
      <TweetMainCenter tweet={tweet} user={user} />
      <TweetMainBottom tweet={tweet} user={user} />
    </TweetMainContainer>
  );
};

export default TweetMain;
