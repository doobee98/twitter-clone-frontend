import React from 'react';
import styled from 'styled-components';
import { ColorPalette } from 'utils/colorUtils';

const DropdownItemWrapper = styled.div`
  display: flex;
  flex-direction: row;

  margin: 3px;

  color: ${ColorPalette.BLACK};

  &:hover {
    background-color: ${ColorPalette.GRAY_76};
    color: ${ColorPalette.BLACK};
    cursor: pointer;
  }
`;

interface DropdownItemsProps {
  onClick?: () => void;
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

  background-color: ${ColorPalette.WHITE};
`;

const Dropdown: React.FC = (props) => {
  const { children } = props;
  return <DropdownContainer>{children}</DropdownContainer>;
};

export default Dropdown;
