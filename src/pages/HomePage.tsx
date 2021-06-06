import React, { useState } from 'react';
import styled from 'styled-components';
import PageTemplate from 'components/base/PageTemplate';
import Popup from 'components/base/Popup';
import TooltipTest from 'components/base/TooltipTest';
import Button from 'components/base/Button';
import TweetPost from 'components/post/TweetPost';
import TweetPostTooltip from 'components/post/TweetPostPopup';

const ToBeRemovedWrapper = styled(React.Fragment)``;

const ToBeRemovedTestButton = styled(Button)`
  margin: 0;
  border: 1px solid black;
  width: 300px;
  height: 100px;
`;

const HomePage: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [isOpenedTT, setIsOpenedTT] = useState(false);
  const [clickLeft, setClickLeft] = useState(0);
  const [clickTop, setClickTop] = useState(0);

  const openPopup = () => {
    setIsOpened(true);
  };

  const closePopup = () => {
    setIsOpened(false);
  };

  const openTooltip = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined,
  ) => {
    if (!event) return;
    // setClickLeft(
    //   event.currentTarget.offsetLeft - event.currentTarget.offsetWidth,
    // );
    setClickTop(event.currentTarget.offsetTop);
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
          <ToBeRemovedTestButton onClick={openTooltip}>
            툴팁테스트용버튼
          </ToBeRemovedTestButton>{' '}
          <ToBeRemovedTestButton onClick={openTooltip}>
            툴팁테스트용버튼
          </ToBeRemovedTestButton>{' '}
          <ToBeRemovedTestButton onClick={openTooltip}>
            툴팁테스트용버튼
          </ToBeRemovedTestButton>{' '}
          <ToBeRemovedTestButton onClick={openTooltip}>
            툴팁테스트용버튼
          </ToBeRemovedTestButton>{' '}
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
        <TooltipTest
          position={[clickLeft, clickTop]}
          isOpened={isOpenedTT}
          setIsOpened={setIsOpenedTT}
        />
      </ToBeRemovedWrapper>
    </PageTemplate>
  );
};

export default HomePage;
