import React, { Children, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { ColorPalette, hexToRgbA } from 'utils/colorUtils';
import useClickOutside from '../../hooks/useClickOutside';

interface ModalBackgroundProps {
  isLocked: boolean;
}

const ModalBackground = styled.div<ModalBackgroundProps>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;

  width: 100%;
  height: 100%;
  margin: 0;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  border-collapse: collapse;

  background-color: ${(props) =>
    props.isLocked && hexToRgbA(ColorPalette.BLACK, 0.4)};
`;

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

const ContentWrapper = styled.div`
  margin: auto;
  width: 90%;
  padding: 10px 0px;
  padding-top: 0;
`;

interface ModalProps {
  position?: [number, number];
  isLocked: boolean;
  width: number;
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

const Modal: React.FC<ModalProps> = (props) => {
  const { isOpened, width, isLocked, setIsOpened, className, children } = props;

  const [readyToOpen, setReadyToOpen] = useState(isOpened);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const popupRef = useRef<HTMLDivElement>(null);

  const initTooltip = async () => {
    await setReadyToOpen(true);
    if (isLocked) {
      document.body.style.paddingRight = ` ${
        window.innerWidth - document.documentElement.clientWidth
      }px`;
      document.body.style.overflow = 'hidden';
    }
  };

  const finishTooltip = () => {
    if (isLocked) {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = ` ${0}px`;
    }
    setReadyToOpen(false);
  };

  useClickOutside(popupRef, () => {
    setIsOpened(false);
  });

  useEffect(() => {
    if (!isOpened) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {}; // NEED default return function
    }
    initTooltip();
    return () => {
      finishTooltip();
    };
  }, [isOpened]);

  return (
    <>
      {readyToOpen && (
        <ModalBackground isLocked={isLocked} className={className}>
          <ModalContainer
            ref={popupRef}
            isLocked={isLocked}
            top={top + 100}
            left={left}
            width={width}
          >
            {children}
          </ModalContainer>
        </ModalBackground>
      )}
    </>
  );
};

export default Modal;
