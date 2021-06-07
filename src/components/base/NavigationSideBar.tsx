import React from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAuthSelector } from 'hooks/redux';
import { login, logout } from 'modules/auth';
import { ColorPalette, hexToRgbA } from 'utils/colorUtils';
import { BasicType, HighlightType } from 'utils/iconUtils';
import NavItem from './NavItem';
import Button from './Button';
import Icon from './Icon';

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

const TweetButton = styled(Button)`
  width: 90%;
  margin: 20px 0;
  color: ${ColorPalette.WHITE};
  background-color: ${ColorPalette.SKYBLUE};
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background-color: ${ColorPalette.SKYBLUE_DARK};
  }
`;

const UserButton = styled(Button)`
  width: 100%;

  &:hover {
    background-color: ${hexToRgbA(ColorPalette.SKYBLUE, 0.1)};
  }
`;

const UserButtonTextArea = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;

  & > * + * {
    margin-top: 5px;
  }
`;

const Username = styled.strong``;

const UserId = styled.span`
  color: ${ColorPalette.GRAY_70};
`;

const BottomContainer = styled.div`
  width: 100%;
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
          <NavItem iconType={BasicType.MORE_CIRCLE}>More</NavItem>
        </NavList>
        <TweetButton>Tweet</TweetButton>
      </TopContainer>
      <BottomContainer>
        <ToBeRemovedWrapper>
          <button type="button" onClick={fetchLogin}>
            로그인
          </button>
          <button type="button" onClick={fetchLogout}>
            로그아웃
          </button>
        </ToBeRemovedWrapper>
        {currentUser && (
          <UserButton>
            <UserButtonTextArea>
              <Username>{currentUser.username}</Username>
              <UserId>@{currentUser.id}</UserId>
            </UserButtonTextArea>
            <Icon iconType={BasicType.MORE} iconSize={20} />
          </UserButton>
        )}
      </BottomContainer>
    </NavigationSideBarContainer>
  );
};

export default NavigationSideBar;
