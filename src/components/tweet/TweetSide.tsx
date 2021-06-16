import React from 'react';
import styled from 'styled-components';
import Tweet from '../../models/tweet';

const TweetProfileWrapper = styled.div`
  display: flex;
  width: 40px;
  height: 40px;

  border: 1px solid;
  border-radius: 9999px;
  margin: 1px;

  justify-content: center;
  align-items: center;
`;

const TweetProfile: React.FC = () => {
  return <div>pic</div>;
};

const TweetSideContainer = styled.div`
  display: flex;

  width: 50px;
`;

interface TweetSideProps {
  tweet: Tweet;
}

const TweetSide: React.FC<TweetSideProps> = (props) => {
  const { children, tweet } = props;

  return (
    <TweetSideContainer>
      <TweetProfileWrapper>
        <TweetProfile />
      </TweetProfileWrapper>
    </TweetSideContainer>
  );
};

export default TweetSide;
