import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ColorPalette } from 'utils/colorUtils';

interface ModalContainerProps {
  top: number;
  width: number;
}

const ModalContainer = styled.div<ModalContainerProps>`
  position: absolute;
  background-color: ${ColorPalette.WHITE};
  border-radius: 25px;
  top: ${(props) => props.top}px;
  left: calc(50vw - ${(props) => props.width / 2}px);
  width: ${(props) => props.width}px;
  min-width: 375px;
`;

interface ModalProps {
  position?: [number, number];
  width: number;
  className?: string;
}

const Modal: React.FC<ModalProps> = (props) => {
  const { width, className, children } = props;

  return (
    <ModalContainer top={window.pageYOffset + 100} width={width}>
      {children}
    </ModalContainer>
  );
};

export default Modal;
