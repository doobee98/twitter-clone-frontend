import React from 'react';
import styled from 'styled-components';
import PageTemplate from 'components/base/PageTemplate';
import TweetPost from 'components/post/TweetPost';

const HomePage: React.FC = () => {
  return (
    <PageTemplate title="Home">
      <TweetPost />
    </PageTemplate>
  );
};

export default HomePage;
