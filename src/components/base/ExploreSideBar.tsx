import React from 'react';
import styled from 'styled-components';

const ExploreSideBarContainer = styled.aside`
  position: relative;
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 1;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ToBeRemovedWrapper = styled(React.Fragment)``;

const ExploreSideBar: React.FC = () => {
  return (
    <ExploreSideBarContainer>
      <ToBeRemovedWrapper>ExploreSideBar</ToBeRemovedWrapper>
    </ExploreSideBarContainer>
  );
};

export default ExploreSideBar;
