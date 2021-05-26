import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { ColorPalette, hexToRgbA } from 'utils/colorUtils';
import { BasicType, HighlightType } from 'utils/iconUtils';
import Button from './Button';
import Icon from './Icon';

const NavItemContainer = styled.div`
  width: 100%;
  cursor: pointer;
`;

interface NavItemButtonProps {
  isActive?: boolean;
  isHover?: boolean;
}

const NavItemButton = styled(Button)<NavItemButtonProps>`
  margin: 5px 0;
  color: inherit;

  ${(props) =>
    props.isActive &&
    css`
      color: ${ColorPalette.SKYBLUE};
    `}

  ${(props) =>
    props.isHover &&
    css`
      color: ${ColorPalette.SKYBLUE};
      background-color: ${hexToRgbA(ColorPalette.SKYBLUE, 0.1)};
    `}
`;

const NavIcon = styled(Icon)`
  width: 25px;
  height: 25px;
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
  const [isHover, setIsHover] = useState(false);

  const onHover = () => {
    setIsHover(true);
  };

  const onHoverOut = () => {
    setIsHover(false);
  };

  const goToLink = () => {
    if (link) {
      history.push(link);
    }
  };

  return (
    <NavItemContainer
      className={className}
      onClick={goToLink}
      onMouseEnter={onHover}
      onMouseLeave={onHoverOut}
    >
      <NavItemButton isActive={isCurrentPath} isHover={isHover}>
        <NavIcon iconType={iconType} isHighlighted={isCurrentPath} />
        {children && <NavItemText>{children}</NavItemText>}
      </NavItemButton>
    </NavItemContainer>
  );
};

export default NavItem;
