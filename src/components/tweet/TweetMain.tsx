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
  hideInteraction?: boolean;
}

const TweetMain: React.FC<TweetMainProps> = (props) => {
  const { tweet, hideInteraction } = props;

  return (
    <TweetMainContainer>
      <TweetMainTop tweet={tweet} hideInteraction={hideInteraction} />
      <TweetMainCenter tweet={tweet} />
      {!hideInteraction && <TweetMainBottom tweet={tweet} />}
    </TweetMainContainer>
  );
};

export default TweetMain;
