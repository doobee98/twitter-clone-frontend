import React from 'react';
import styled from 'styled-components';

const ExploreSideBarContainer = styled.aside`
  max-width: 350px;

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
