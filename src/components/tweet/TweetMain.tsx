import React from 'react';
import styled from 'styled-components';
import Tweet from '../../models/tweet';
import TweetMainTop from './TweetMainTop';
import TweetMainCenter from './TweetMainCenter';
import TweetMainBottom from './TweetMainBottom';

const TweetMainContainer = styled.div`
  display: flex;
  height: 100%;
  margin-left: 1%;
  width: 99%;

  display: inline-block;
  vertical-align: top;
`;

interface TweetMainProps {
  tweet: Tweet;
}

const TweetMain: React.FC<TweetMainProps> = (props) => {
  const { tweet } = props;

  return (
    <TweetMainContainer>
      <TweetMainTop tweet={tweet} />
      <TweetMainCenter tweet={tweet} />
      <TweetMainBottom tweet={tweet} />
    </TweetMainContainer>
  );
};

export default TweetMain;
