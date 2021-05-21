import React from 'react';
import { useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useAppDispatch, useAuthSelector } from 'hooks/redux';
import { login, logout } from 'modules/auth';
import { ColorPalette, hexToRgbA } from 'utils/colorUtils';
import Button from './Button';
import {
  BookmarksIcon,
  ExploreIcon,
  HomeIcon,
  ListsIcon,
  MessagesIcon,
  MoreIcon,
  NotificationsIcon,
  ProfileIcon,
  TwitterIcon,
} from './Icon';

const NavigationSideBarContainer = styled.header`
  width: 275px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const TopContainer = styled.div``;

interface MenuItemProps {
  isActive?: boolean;
}

const MenuItem = styled(Button)<MenuItemProps>`
  margin: 5px 0;
  padding-right: 20px;
  justify-content: space-around;

  &:hover {
    color: ${ColorPalette.SKYBLUE};
    background-color: ${hexToRgbA(ColorPalette.SKYBLUE, 0.1)};
  }

  ${(props) =>
    props.isActive &&
    css`
      color: ${ColorPalette.SKYBLUE};
    `}
`;

const BlueMenuItem = styled(MenuItem)`
  color: ${ColorPalette.SKYBLUE};
  padding-right: 10px;
`;

const MenuText = styled.span`
  font-size: 20px;
  font-weight: bold;
  margin-left: 20px;
`;

const BottomContainer = styled.div`
  margin: 12px 0;
`;

const ToBeRemovedWrapper = styled(React.Fragment)``;

const NavigationSideBar: React.FC = () => {
  const authStore = useAuthSelector();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { currentUser } = authStore;

  const isPathname = (path: string) => location.pathname === path;

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
        <nav>
          <BlueMenuItem>
            <TwitterIcon size="25px" />
          </BlueMenuItem>
          <MenuItem isActive={isPathname('/home')}>
            <HomeIcon size="25px" isHighlighted={isPathname('/home')} />
            <MenuText>Home</MenuText>
          </MenuItem>
          <MenuItem isActive={isPathname('/explore')}>
            <ExploreIcon size="25px" isHighlighted={isPathname('/explore')} />
            <MenuText>Explore</MenuText>
          </MenuItem>
          <MenuItem isActive={isPathname('/notifications')}>
            <NotificationsIcon
              size="25px"
              isHighlighted={isPathname('/notifications')}
            />
            <MenuText>Notifications</MenuText>
          </MenuItem>
          <MenuItem isActive={isPathname('/messages')}>
            <MessagesIcon size="25px" isHighlighted={isPathname('/messages')} />
            <MenuText>Messages</MenuText>
          </MenuItem>
          {/* TODO: need to change routing '/i/bookmarks' */}
          <MenuItem isActive={isPathname('/bookmarks')}>
            <BookmarksIcon
              size="25px"
              isHighlighted={isPathname('/bookmarks')}
            />
            <MenuText>Bookmarks</MenuText>
          </MenuItem>
          {/* TODO: need to change routing '/:user_id/lists' */}
          <MenuItem isActive={isPathname('/lists')}>
            <ListsIcon size="25px" isHighlighted={isPathname('/lists')} />
            <MenuText>Lists</MenuText>
          </MenuItem>
          {/* TODO: need to change routing '/:user_id' */}
          <MenuItem isActive={isPathname('/profile')}>
            <ProfileIcon size="25px" isHighlighted={isPathname('/profile')} />
            <MenuText>Profile</MenuText>
          </MenuItem>
          <MenuItem>
            <MoreIcon size="25px" />
            <MenuText>More</MenuText>
          </MenuItem>
        </nav>
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
