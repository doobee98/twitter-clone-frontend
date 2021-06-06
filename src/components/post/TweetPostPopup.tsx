import React, { useState } from 'react';
import styled from 'styled-components';
import Tooltip from '../base/Tooltip';
import NavItem from '../base/NavItem';
import useTweetPost from '../../hooks/useTweetPost';

const NavItemWrapper = styled.div``;

const TweetPostPermissionList: React.FC = () => {
  const { permissionList, setSelectedPermission } = useTweetPost();
  return (
    <>
      {permissionList.map((permission, index) => (
        <NavItemWrapper
          key={permission.id}
          onClick={() => {
            console.log(index);
            setSelectedPermission(index);
          }}
        >
          <NavItem iconType={permission.iconType}>
            {permission.permission}
          </NavItem>
        </NavItemWrapper>
      ))}
    </>
  );
};

interface TooltipProps {
  position: [number, number];
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

const TweetPostTooltip: React.FC<TooltipProps> = (props) => {
  const { position, isOpened, setIsOpened, className } = props;
  return (
    <Tooltip position={position} isOpened={isOpened} setIsOpened={setIsOpened}>
      <h5>Who can reply</h5>
      Choose who can reply to this Tweet.
      <br />
      Anyone mentioned can always reply.
      <TweetPostPermissionList />
    </Tooltip>
  );
};

export default TweetPostTooltip;
