import useClickOutside from '../../hooks/useClickOutside';
import React, { Children, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ColorPalette, hexToRgbA } from 'utils/colorUtils';

interface ModalBackgroundProps {
  isLocked: boolean;
}

const ModalBackground = styled.div<ModalBackgroundProps>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;

  width: 100%;
  height: 100%;
  margin: 0;
  background-color: ${(props) =>
    props.isLocked && hexToRgbA(ColorPalette.BLACK, 0.4)};

  display: flex;
  justify-content: center;
  align-items: flex-start;
  border-collapse: collapse;
`;

interface ModalContainerProps {
  isLocked: boolean;
  topMargin: number;
  leftMargin: number;
  width: number;
}

const ModalContainer = styled.div<ModalContainerProps>`
  position: absolute;
  background-color: ${ColorPalette.WHITE};
  border-radius: 25px;
  padding: 0;

  top: ${(props) => (props.isLocked ? 100 : props.topMargin)}px;
  left: ${(props) => !props.isLocked && props.leftMargin}px;
  width: ${(props) => props.width}px;
`;

const HeaderWrapper = styled.div`
  padding-left: 20px;
  border-bottom: 1px solid ${ColorPalette.BLACK};
`;

const ContentWrapper = styled.div`
  margin: auto;
  width: 90%;
  padding: 10px 0px;
  padding-top: 0;
`;

const FooterWrapper = styled.div`
  padding: 0;

  margin: auto;
  width: 90%;
`;

interface ModalProps {
  position: [number, number];
  isLocked: boolean;
  width: number;
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  Header?: any;
  Footer?: any;
}

const Modal: React.FC<ModalProps> = (props) => {
  const {
    isOpened,
    position,
    width,
    isLocked,
    setIsOpened,
    className,
    children,
    Header,
    Footer,
  } = props;

  const [readyToOpen, setReadyToOpen] = useState(isOpened);
  const [topMargin, setTopMargin] = useState(0);
  const [leftMargin, setLeftMargin] = useState(0);
  const popupRef = useRef<HTMLDivElement>(null);

  const initTooltip = async () => {
    await setReadyToOpen(true);
    if (isLocked) disableScroll();
    else {
      setTopMargin(position[1]);
      setLeftMargin(position[0]);
    }
  };

  const finishTooltip = () => {
    if (isLocked) activateScroll();
    setReadyToOpen(false);
  };

  const disableScroll = async () => {
    const offsetY = window.pageYOffset;
    document.body.style.top = `${-offsetY}px`;
    document.body.classList.add('scroll-lock');
  };

  const activateScroll = () => {
    const offsetY = Math.abs(parseInt(document.body.style.top || '0', 10));
    document.body.classList.remove('scroll-lock');
    document.body.style.removeProperty('top');
    window.scrollTo({ top: offsetY || 0 });
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
    return finishTooltip;
  }, [isOpened]);

  return (
    <>
      {readyToOpen && (
        <ModalBackground isLocked={isLocked} className={className}>
          <ModalContainer
            ref={popupRef}
            isLocked={isLocked}
            topMargin={topMargin + 100}
            leftMargin={leftMargin + 100}
            width={width}
          >
            {Header && <HeaderWrapper>{Header}</HeaderWrapper>}
            <ContentWrapper>{children}</ContentWrapper>
            {Footer && <FooterWrapper>{Footer}</FooterWrapper>}
          </ModalContainer>
        </ModalBackground>
      )}
    </>
  );
};

export default Modal;
