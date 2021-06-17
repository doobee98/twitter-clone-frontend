import React, { Children, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { ColorPalette, hexToRgbA } from 'utils/colorUtils';
import useClickOutside from '../../hooks/useClickOutside';

interface ModalContainerProps {
  isLocked: boolean;
  top: number;
  left: number;
  width: number;
}

const ModalContainer = styled.div<ModalContainerProps>`
  position: absolute;
  background-color: ${ColorPalette.WHITE};
  border-radius: 25px;

  top: ${(props) => (props.isLocked ? 100 : props.top)}px;
  left: ${(props) => !props.isLocked && props.left}px;
  width: ${(props) => props.width}px;
`;

interface ModalProps {
  position?: [number, number];
  isLocked: boolean;
  width: number;
  className?: string;
}

const Modal: React.FC<ModalProps> = (props) => {
  const { width, isLocked, className, children } = props;

  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  return (
    <ModalContainer
      isLocked={isLocked}
      top={top + 100}
      left={left}
      width={width}
    >
      {children}
    </ModalContainer>
  );
};

export default Modal;
