import React, { useState } from 'react';
import styled from 'styled-components';
import PageTemplate from 'components/base/PageTemplate';
import TweetList from 'components/tweet/TweetList';
import TweetPost from 'components/post/TweetPost';
// REMOVE
import Button from 'components/base/Button';
import PostPopupModal from 'components/modal/PostPopupModal';

// REMOVED
const ToBeRemovedTestButton = styled(Button)`
  margin: 0;
  border: 1px solid black;
  width: 300px;
  height: 100px;
`;

const HomePage: React.FC = () => {
  // REMOVED
  const [isOpened, setIsOpened] = useState(false);
  const openPopup = () => {
    setIsOpened(true);
  };

  return (
    <PageTemplate title="Home">
      <div>Temporary Home Page</div>

      {/* REMOVED */}
      <ToBeRemovedTestButton onClick={openPopup}>
        팝업테스트용버튼
      </ToBeRemovedTestButton>
      <PostPopupModal
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        width={600}
      />

      <TweetPost />
      <TweetList />
    </PageTemplate>
  );
};

export default HomePage;
