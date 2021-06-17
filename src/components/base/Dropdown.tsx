import React, { useState } from 'react';
import Button from 'components/base/Button';
import styled, { css } from 'styled-components';
import { ColorPalette } from 'utils/colorUtils';
import Profile from './Profile';

const DropdownItemWrapper = styled.div`
  display: flex;
  flex-direction: row;

  margin: 3px;

  color: black;

  &:hover {
    background-color: ${ColorPalette.GRAY_76};
    color: black;
    cursor: pointer;
  }
`;

interface DropdownItemsProps {
  onClick?: () => any;
}

export const DropdownItem: React.FC<DropdownItemsProps> = (props) => {
  const { children, onClick } = props;

  return (
    <DropdownItemWrapper onClick={onClick}>{children}</DropdownItemWrapper>
  );
};

const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;

  position: absolute;
  z-index: 10;
  width: auto;
  height: auto;
  border: 0.5px solid ${ColorPalette.GRAY_E6};
  border-radius: 2px;

  background-color: white;
`;

interface DropdownProps {
  items?: string[];
}

const Dropdown: React.FC<DropdownProps> = (props) => {
  const { children } = props;
  return <DropdownContainer>{children}</DropdownContainer>;
};

export default Dropdown;
