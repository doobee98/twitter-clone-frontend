import React from 'react';
import styled from 'styled-components';
import PageTemplate from 'components/base/PageTemplate';
import TweetList from 'components/tweet/TweetList';

const HomePage: React.FC = () => {


  return (
    <PageTemplate title="Home">
      <div>Temporary Home Page</div>
      <TweetList />
    </PageTemplate>
  );
};

export default HomePage;
