import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import TweetModel from '../../models/tweet';

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
  tweet: TweetModel;
}

const TweetSide: React.FC<TweetSideProps> = (props) => {
  const { children, tweet } = props;

  const history = useHistory();

  const goToUserProfile = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    history.push(`/${tweet.user}`);
  };

  return (
    <TweetSideContainer>
      <TweetProfileWrapper onClick={goToUserProfile}>
        <TweetProfile />
      </TweetProfileWrapper>
    </TweetSideContainer>
  );
};

export default TweetSide;
