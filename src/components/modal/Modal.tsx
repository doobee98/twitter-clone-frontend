import React from 'react';
import styled from 'styled-components';
import { ColorPalette } from 'utils/colorUtils';

interface ModalContainerProps {
  top: number;
}

const ModalContainer = styled.div<ModalContainerProps>`
  position: absolute;
  background-color: ${ColorPalette.WHITE};
  border-radius: 25px;
  top: ${(props) => props.top}px;
  left: 42vw;
  width: 600px;
  min-width: 375px;
`;

interface ModalProps {
  position?: [number, number];
  className?: string;
}

const Modal: React.FC<ModalProps> = (props) => {
  const { children } = props;

  return (
    <ModalContainer top={window.pageYOffset + 100}>{children}</ModalContainer>
  );
};

export default Modal;
