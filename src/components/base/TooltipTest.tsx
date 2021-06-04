import React, { useState } from 'react';
import styled from 'styled-components';
import { ColorPalette, hexToRgbA } from 'utils/colorUtils';
import { BasicType } from 'utils/iconUtils';
import Tooltip from './Tooltip';
import NavItem from './NavItem';
import Button from './Button';

const ListItem = styled(NavItem)``;

const ListItemDivider = styled.div``;

const SelectList: React.FC = () => {
  return (
    <>
      <NavItem iconType={BasicType.CHAT} link="/topics">
        Topics
      </NavItem>
      <NavItem iconType={BasicType.THUNDER} link="/momonents">
        Moments
      </NavItem>
      <NavItem iconType={BasicType.NEWS} link="/newsletter">
        Newsletters
      </NavItem>
      <NavItem iconType={BasicType.AD} link="/ad">
        Twitter Ads
      </NavItem>
      <NavItem iconType={BasicType.GRAPH} link="/analytics">
        Analytics
      </NavItem>
      <ListItemDivider />
      <NavItem iconType={BasicType.SETTING} link="/setting">
        Settings and privacy
      </NavItem>
      <NavItem iconType={BasicType.QUESTION} link="/help">
        Help Center
      </NavItem>
      <NavItem iconType={BasicType.DISPLAY} link="/display">
        Display
      </NavItem>
      <NavItem iconType={BasicType.SHORTCUT} link="/shortcuts">
        Keyboards shortcuts
      </NavItem>
    </>
  );
};

const LogoNavItem = styled(NavItem)`
  color: ${ColorPalette.SKYBLUE};
  width: 40px;
`;

interface TooltipProps {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

const TooltipTest: React.FC<TooltipProps> = (props) => {
  const { isOpened, setIsOpened, className } = props;
  return (
    <Tooltip isOpened={isOpened} setIsOpened={setIsOpened}>
      <SelectList />
    </Tooltip>
  );
};

export default TooltipTest;
