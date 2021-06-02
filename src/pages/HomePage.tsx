import React, { useState } from 'react';
import styled from 'styled-components';
import PageTemplate from 'components/base/PageTemplate';
import Popup from 'components/base/Popup';
import Button from 'components/base/Button';

const ToBeRemovedWrapper = styled(React.Fragment)``;

const ToBeRemovedTestButton = styled(Button)`
  border: 1px solid black;
  width: 200px;
  height: 200px;
`;

const HomePage: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);

  const openPopup = () => {
    setIsOpened(true);
  };

  return (
    <PageTemplate title="Home">
      <ToBeRemovedWrapper>
        <div>Temporary Home Page</div>
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
        </div>
        <Popup isOpened={isOpened} setIsOpened={setIsOpened}>
          <h1>Hello Popup!</h1>
        </Popup>
      </ToBeRemovedWrapper>
    </PageTemplate>
  );
};

export default HomePage;
