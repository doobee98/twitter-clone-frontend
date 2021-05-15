import styled from 'styled-components';

const NavigationSideBarContainer = styled.header`
  position: sticky;
  top: 0;
  overflow-y: auto;
  max-height: 100vh;
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const NavigationSideBar: React.FC = () => {
  return (
    <NavigationSideBarContainer>
      <h4>NavigationSideBar</h4>
    </NavigationSideBarContainer>
  );
};

export default NavigationSideBar;
