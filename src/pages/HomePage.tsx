import React from 'react';
import styled from 'styled-components';
import PageTemplate from 'components/base/PageTemplate';

const ToBeRemovedWrapper = styled(React.Fragment)``;

const HomePage: React.FC = () => {
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
        </div>
      </ToBeRemovedWrapper>
    </PageTemplate>
  );
};

export default HomePage;
