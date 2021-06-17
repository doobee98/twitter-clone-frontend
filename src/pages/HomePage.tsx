import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import PageTemplate from 'components/base/PageTemplate';
import TweetList from 'components/tweet/TweetList';
import TweetPost from 'components/post/TweetPost';
import PostPopupModal from 'components/modal/PostPopupModal';
import ContentTemplate, {
  ContentHeader,
  ContentSection,
} from 'components/base/ContentTemplate';
import { ColorPalette } from 'utils/colorUtils';
import { useAuthSelector, useModalOpen } from 'hooks/redux';

const SpaceSection = styled(ContentSection)`
  background-color: ${ColorPalette.GRAY_F9};
  height: 12px;
`;

const HomePage: React.FC = () => {
  const authStore = useAuthSelector();
  const { currentUser } = authStore;
  const modalStore = useModalOpen();
  const { isOpenedPostModal } = modalStore;

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
      <PostPopupModal isOpened={isOpenedPostModal} width={600} />
    </>
  );
};

export default HomePage;
