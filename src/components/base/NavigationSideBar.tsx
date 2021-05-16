import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from 'modules';

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
  const authStore = useSelector((state: RootState) => state.authReducer);
  const { currentUser } = authStore;

  return (
    <NavigationSideBarContainer>
      <h4>NavigationSideBar</h4>
      {currentUser && (
        <>
          <h6>아이디: {currentUser.id}</h6>
          <h6>닉네임: {currentUser.username}</h6>
          <h6>팔로잉: {currentUser.following_num}</h6>
          <h6>팔로워: {currentUser.follower_num}</h6>
        </>
      )}
    </NavigationSideBarContainer>
  );
};

export default NavigationSideBar;
