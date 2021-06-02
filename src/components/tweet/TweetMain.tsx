import React from 'react';
import styled from 'styled-components';
import TweetModel from '../../models/tweet';
import TweetMainTop from './TweetMainTop';
import TweetMainCenter from './TweetMainCenter';
import TweetMainBottom from './TweetMainBottom';

const TweetMainContainer = styled.div`
  height: 100%;
  width: 80%;

  border: 1px solid;
  margin-left: 1px;
  margin-right: 2px;

  display: inline-block;
  vertical-align: top;
`;

interface TweetMainProps {
  tweet: TweetModel;
}

const TweetMain: React.FC<TweetMainProps> = (props) => {
  const { children, tweet } = props;

  return (
    <TweetMainContainer>
      <TweetMainTop tweet={tweet} />
      <TweetMainCenter tweet={tweet} />
      <TweetMainBottom tweet={tweet} />
    </TweetMainContainer>
  );
};

export default TweetMain;
