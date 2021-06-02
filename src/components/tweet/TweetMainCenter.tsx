import React from 'react';
import styled from 'styled-components';
import TweetModel from '../../models/tweet';

const TweetMainTextWrapper = styled.div`
  padding: 1px;
  margin: 1px;
`;

const TweetMainContentWrapper = styled.div`
  height: 100px;

  border: 1px solid;
  margin: 1px;
`;

interface TweetMainCenterProps {
  tweet: TweetModel;
}

const TweetText: React.FC<TweetMainCenterProps> = (props) => {
  const { children, tweet } = props;

  return <div>text : {tweet.text}</div>;
};

const TweetContent: React.FC<TweetMainCenterProps> = (props) => {
  const { children, tweet } = props;

  return <div>content :</div>;
};

const TweetMainCenterContainer = styled.div`
  height: auto;

  border: 1px solid;
  margin: 1px;
`;

const TweetMainCenter: React.FC<TweetMainCenterProps> = (props) => {
  const { children, tweet } = props;

  return (
    <TweetMainCenterContainer>
      <TweetMainTextWrapper>
        <TweetText tweet={tweet} />
      </TweetMainTextWrapper>
      <TweetMainContentWrapper>
        <TweetContent tweet={tweet} />
      </TweetMainContentWrapper>
    </TweetMainCenterContainer>
  );
};

export default TweetMainCenter;
