import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PageTemplate from 'components/base/PageTemplate';
import TweetList from 'components/tweet/TweetList';
import TweetPost from 'components/post/TweetPost';
import Button from 'components/base/Button';
import PostPopupModal from 'components/modal/PostPopupModal';
import { useAppDispatch, useModalOpen } from 'hooks/redux';
import { openPostModal, closePostModal } from 'modules/modal';

const HomePage: React.FC = () => {
  const modalStore = useModalOpen();
  const { isOpenedPostModal } = modalStore;

  return (
    <PageTemplate title="Home">
      <TweetPost />
      <TweetList />
      <PostPopupModal isOpened={isOpenedPostModal} width={600} />
    </PageTemplate>
  );
};

export default HomePage;
