import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { ColorPalette, hexToRgbA } from 'utils/colorUtils';
import { BasicType, HighlightType } from 'utils/iconUtils';
import Button from './Button';
import Icon from './Icon';

// change component order to avoid hoisting
const NavItemButton = styled(Button)`
  margin: 5px 0;
`;

interface NavItemContainerProps {
  isActive?: boolean;
}

const NavItemContainer = styled.div<NavItemContainerProps>`
  width: 100%;
  cursor: pointer;

  ${(props) =>
    props.isActive &&
    css`
      color: ${ColorPalette.SKYBLUE};
    `}

  &:hover {
    & > ${NavItemButton} {
      color: ${ColorPalette.SKYBLUE};
      background-color: ${hexToRgbA(ColorPalette.SKYBLUE, 0.1)};
    }
  }
`;

const NavItemText = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-left: 20px;
  margin-right: 10px;
`;

interface NavItemProps {
  iconType: BasicType | HighlightType;
  link?: string;
  className?: string;
}

const NavItem: React.FC<NavItemProps> = (props) => {
  const { iconType, link, className, children } = props;
  const history = useHistory();
  const location = useLocation();
  const isCurrentPath = link === location.pathname;

  const goToLink = () => {
    if (link) {
      history.push(link);
    }
  };

  return (
    <NavItemContainer
      className={className}
      onClick={goToLink}
      isActive={isCurrentPath}
    >
      <NavItemButton>
        <Icon iconType={iconType} isHighlighted={isCurrentPath} iconSize={25} />
        {children && <NavItemText>{children}</NavItemText>}
      </NavItemButton>
    </NavItemContainer>
  );
};

export default NavItem;
