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

const ExploreSideBar: React.FC = () => {
  return (
    <ExploreSideBarContainer>
      <div>ExploreSideBar</div>
    </ExploreSideBarContainer>
  );
};

export default ExploreSideBar;
