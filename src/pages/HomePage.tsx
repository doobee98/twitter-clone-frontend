import React from 'react';
import styled from 'styled-components';
import PageTemplate from 'components/base/PageTemplate';
import TweetList from 'components/tweet/TweetList';
import TweetPost from 'components/post/TweetPost';

const HomePage: React.FC = () => {
  return (
    <PageTemplate title="Home">
      <div>Temporary Home Page</div>
      <TweetPost />
      <TweetList />
    </PageTemplate>
  );
};

export default HomePage;
