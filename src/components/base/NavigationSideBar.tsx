import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAuthSelector } from 'hooks/redux';
import { login, logout } from 'modules/auth';
import { ColorPalette } from 'utils/colorUtils';
import { BasicType, HighlightType } from 'utils/iconUtils';
import NavItem from './NavItem';

const NavigationSideBarContainer = styled.header`
  width: 275px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const TopContainer = styled.div`
  width: 100%;
`;

const NavList = styled.nav`
  width: 100%;
`;

const LogoNavItem = styled(NavItem)`
  color: ${ColorPalette.SKYBLUE};
  width: 40px;
`;

const BottomContainer = styled.div`
  margin: 12px 0;
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
      <TopContainer>
        <NavList>
          <LogoNavItem iconType={BasicType.TWITTER} link="/home" />
          <NavItem iconType={HighlightType.HOME} link="/home">
            Home
          </NavItem>
          <NavItem iconType={HighlightType.EXPLORE} link="/explore">
            Explore
          </NavItem>
          <NavItem iconType={HighlightType.NOTIFICATIONS} link="/notifications">
            Notifications
          </NavItem>
          <NavItem iconType={HighlightType.MESSAGES} link="/messages">
            Messages
          </NavItem>
          {/* TODO: need to change routing '/i/bookmarks' */}
          <NavItem iconType={HighlightType.BOOKMARKS} link="/bookmarks">
            Bookmarks
          </NavItem>
          {/* TODO: need to change routing '/:user_id/lists' */}
          <NavItem iconType={HighlightType.LISTS} link="/lists">
            Lists
          </NavItem>
          {/* TODO: need to change routing '/:user_id' */}
          <NavItem iconType={HighlightType.PROFILE} link="/profile">
            Profile
          </NavItem>
          <NavItem iconType={BasicType.MORE}>More</NavItem>
        </NavList>
      </TopContainer>
      <BottomContainer>
        <ToBeRemovedWrapper>
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
      </BottomContainer>
    </NavigationSideBarContainer>
  );
};

export default NavigationSideBar;
