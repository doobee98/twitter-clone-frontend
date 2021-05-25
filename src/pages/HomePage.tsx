import React from 'react';
import styled from 'styled-components';
import PageTemplate from 'components/base/PageTemplate';
import TweetPost from 'components/post/TweetPost';

const ToBeRemovedWrapper = styled(React.Fragment)``;

const HomePage: React.FC = () => {
  return (
    <PageTemplate title="Home">
      <ToBeRemovedWrapper>
        <TweetPost />
      </ToBeRemovedWrapper>
    </PageTemplate>
  );
};

export default HomePage;
