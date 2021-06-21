import React from 'react';
import styled from 'styled-components';
import { useRootDispatch, useAuthSelector } from 'hooks/redux';
import { authActions } from 'modules/auth';
import { modalActions } from 'modules/modal';
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

const NotImplementedNavItem = styled(NavItem)`
  color: ${ColorPalette.GRAY_96};
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
  border: 1px solid ${ColorPalette.WHITE};

  &:hover {
    border: 1px solid ${ColorPalette.SKYBLUE};
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

const PowerOffIcon = styled(Icon)`
  border-radius: 9999px;
  width: 40px;
  height: 40px;

  &:hover {
    color: ${ColorPalette.SKYBLUE};
    background-color: ${hexToRgbA(ColorPalette.SKYBLUE, 0.2)};
  }
`;

const BottomContainer = styled.div`
  width: 100%;
  margin: 12px 0;
`;

const NavigationSideBar: React.FC = () => {
  const currentUser = useAuthSelector((state) => state.currentUser);
  const dispatch = useRootDispatch();

  const openPopup = () => {
    dispatch(modalActions.openPostModal());
  };

  const fetchLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <NavigationSideBarContainer>
      <TopContainer>
        <NavList>
          <LogoNavItem iconType={BasicType.TWITTER} link="/home" />
          <NavItem iconType={HighlightType.HOME} link="/home">
            Home
          </NavItem>
          <NotImplementedNavItem
            iconType={HighlightType.EXPLORE}
            link="/explore"
          >
            Explore
          </NotImplementedNavItem>
          <NotImplementedNavItem
            iconType={HighlightType.NOTIFICATIONS}
            link="/notifications"
          >
            Notifications
          </NotImplementedNavItem>
          <NotImplementedNavItem
            iconType={HighlightType.MESSAGES}
            link="/messages"
          >
            Messages
          </NotImplementedNavItem>
          <NotImplementedNavItem
            iconType={HighlightType.BOOKMARKS}
            link="/bookmarks"
          >
            Bookmarks
          </NotImplementedNavItem>
          <NotImplementedNavItem iconType={HighlightType.LISTS} link="/lists">
            Lists
          </NotImplementedNavItem>
          <NavItem
            iconType={HighlightType.PROFILE}
            link={currentUser ? `/${currentUser.user_id}` : '/'}
          >
            Profile
          </NavItem>
          <NotImplementedNavItem iconType={BasicType.MORE_CIRCLE}>
            More
          </NotImplementedNavItem>
        </NavList>
        <TweetButton onClick={openPopup}>Tweet</TweetButton>
      </TopContainer>
      <BottomContainer>
        {currentUser && (
          <UserButton>
            <UserButtonTextArea>
              <Username>{currentUser.username}</Username>
              <UserId>@{currentUser.user_id}</UserId>
            </UserButtonTextArea>
            <PowerOffIcon
              iconType={BasicType.POWER_OFF}
              iconSize={20}
              onClick={fetchLogout}
            />
          </UserButton>
        )}
      </BottomContainer>
    </NavigationSideBarContainer>
  );
};

export default NavigationSideBar;
