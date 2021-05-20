import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAuthSelector } from 'hooks/redux';
import { login, logout } from 'modules/auth';

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

const ToBeRemovedWrapper = styled(React.Fragment)``;

const NavigationSideBar: React.FC = () => {
  const authStore = useAuthSelector();
  const dispatch = useAppDispatch();
  const { currentUser } = authStore;

  // [TODO: NEED TO BE REMOVED] test for login button
  const fetchLogin = () => {
    const loginRequest = {
      id: '',
      password: '',
    };
    dispatch(login(loginRequest));
  };

  // [TODO: NEED TO BE REMOVED] test for logout button
  const fetchLogout = () => {
    dispatch(logout());
  };

  return (
    <NavigationSideBarContainer>
      <ToBeRemovedWrapper>
        <h4>NavigationSideBar</h4>
        {currentUser && (
          <>
            <h6>아이디: {currentUser.id}</h6>
            <h6>닉네임: {currentUser.username}</h6>
            <h6>팔로잉: {currentUser.following_num}</h6>
            <h6>팔로워: {currentUser.follower_num}</h6>
          </>
        )}
        <button type="button" onClick={fetchLogin}>
          로그인
        </button>
        <button type="button" onClick={fetchLogout}>
          로그아웃
        </button>
      </ToBeRemovedWrapper>
    </NavigationSideBarContainer>
  );
};

export default NavigationSideBar;
