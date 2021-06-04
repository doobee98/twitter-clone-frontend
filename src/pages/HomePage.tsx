import React, { useState } from 'react';
import styled from 'styled-components';
import PageTemplate from 'components/base/PageTemplate';
import Popup from 'components/base/Popup';
import Tooltip from 'components/base/Tooltip';
import TooltipTest from 'components/base/TooltipTest';
import Button from 'components/base/Button';
import TweetPost from 'components/post/TweetPost';

const ToBeRemovedWrapper = styled(React.Fragment)``;

const ToBeRemovedTestButton = styled(Button)`
  border: 1px solid black;
  width: 200px;
  height: 200px;
`;

const HomePage: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [isOpenedTT, setIsOpenedTT] = useState(false);

  const openPopup = () => {
    setIsOpened(true);
  };

  const closePopup = () => {
    setIsOpened(false);
  };

  const openTooltip = () => {
    setIsOpenedTT(true);
  };

  const closeTooltip = () => {
    setIsOpenedTT(false);
  };

  return (
    <PageTemplate title="Home">
      <ToBeRemovedWrapper>
        <div>Temporary Home Page</div>
        <TweetPost />
        <div
          style={{
            height: '200vh',
            border: `2px solid #1da0f2`,
            margin: '20px',
          }}
        >
          Big-Size Block (For Scroll Test)
          <ToBeRemovedTestButton onClick={openPopup}>
            팝업테스트용버튼
          </ToBeRemovedTestButton>
          <ToBeRemovedTestButton onClick={openTooltip}>
            툴팁테스트용버튼
          </ToBeRemovedTestButton>
        </div>
        <Popup
          isOpened={isOpened}
          onClose={closePopup}
          setIsOpened={setIsOpened}
        >
          <TweetPost />
        </Popup>
        <TooltipTest isOpened={isOpenedTT} setIsOpened={setIsOpenedTT} />
      </ToBeRemovedWrapper>
    </PageTemplate>
  );
};

export default HomePage;
