import React from 'react';
import styled from 'styled-components';
import { BasicType, HighlightType } from 'utils/iconUtils';
import Button, { ButtonProps } from './Button';
import Icon from './Icon';

const StyledButton = styled(Button)`
  margin: 5px 0;
`;

interface IconButtonProps extends ButtonProps {
  iconType: BasicType | HighlightType;
  iconSize?: number;
  isIconHighlighted?: boolean;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = (props) => {
  const {
    type = 'button',
    disabled,
    onClick,
    onHover,
    onHoverOut,
    iconType,
    iconSize = 25,
    isIconHighlighted,
    className,
    children,
  } = props;

  return (
    <StyledButton
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
      onHover={onHover}
      onHoverOut={onHoverOut}
    >
      <Icon
        iconType={iconType}
        isHighlighted={isIconHighlighted}
        size={iconSize}
      />
      {children}
    </StyledButton>
  );
};

export default IconButton;
