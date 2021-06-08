import React from 'react';
import styled from 'styled-components';
import TweetModel from '../../models/tweet';

const TweetCenterTextWrapper = styled.div`
  padding: 1px;
  margin: 1px;
`;

const TweetCenterContentWrapper = styled.div`
  align-items: center;
  justify-content: center;

  height: 100px;

  border: 1px solid;
  border-radius: 15px;
  margin: 1px;
`;

interface TweetCenterProps {
  tweet: TweetModel;
}

const TweetText: React.FC<TweetCenterProps> = (props) => {
  const { children, tweet } = props;

  return <div>text : {tweet.text}</div>;
};

const TweetContent: React.FC<TweetCenterProps> = (props) => {
  const { children, tweet } = props;

  return <div>content :</div>;
};

const TweetCenterContainer = styled.div`
  margin: 1px;
`;

const TweetMainCenter: React.FC<TweetCenterProps> = (props) => {
  const { children, tweet } = props;

  return (
    <TweetCenterContainer>
      <TweetCenterTextWrapper>
        <TweetText tweet={tweet} />
      </TweetCenterTextWrapper>
      <TweetCenterContentWrapper>
        <TweetContent tweet={tweet} />
      </TweetCenterContentWrapper>
    </TweetCenterContainer>
  );
};

export default TweetMainCenter;
