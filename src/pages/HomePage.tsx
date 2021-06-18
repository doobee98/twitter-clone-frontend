import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import PageTemplate from 'components/base/PageTemplate';
import TweetList from 'components/tweet/TweetList';
import TweetPost from 'components/post/TweetPost';
import ContentTemplate, {
  ContentHeader,
  ContentSection,
} from 'components/base/ContentTemplate';
import { ColorPalette } from 'utils/colorUtils';
import { useAuthSelector } from 'hooks/redux';

const SpaceSection = styled(ContentSection)`
  background-color: ${ColorPalette.GRAY_F9};
  height: 12px;
`;

const HomePage: React.FC = () => {
  const currentUser = useAuthSelector((state) => state.currentUser);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <PageTemplate title="Home">
        <ContentTemplate>
          <ContentHeader>
            <strong>Home</strong>
          </ContentHeader>
          <ContentSection>
            <TweetPost />
          </ContentSection>
          <SpaceSection />
          <TweetList />
        </ContentTemplate>
        {/* <ContentTemplate width="300px" hideBorder>
        <ContentHeader hideBorder>
          <strong>SearchBar</strong>
        </ContentHeader>
        <ExploreSideBar />
      </ContentTemplate> */}
      </PageTemplate>
    </>
  );
};

export default HomePage;
