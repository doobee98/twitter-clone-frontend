import useClickOutside from 'hooks/useClickOutside';
import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { ColorPalette } from 'utils/colorUtils';

interface PopupBackgroundProps {
  topMargin: number;
  leftMargin: number;
}

const PopupBackground = styled.div<PopupBackgroundProps>`
  position: absolute;

  top: ${(props) => props.topMargin}px;
  /* left: ${(props) => props.leftMargin}px; */
  left: 0;
  z-index: 100;

  width: 100%;
  height: 100%;
  margin: 0;

  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

interface PopupContainerProps {
  topMargin: number;
  leftMargin: number;
}

const PopupContainer = styled.div<PopupContainerProps>`
  box-shadow: 1px 1px 3px 3px ${ColorPalette.GRAY_E6};
  background-color: ${ColorPalette.WHITE};
`;

const ContentWrapper = styled.div``;

interface TooltipProps {
  position: [number, number];
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = (props) => {
  const { isOpened, position, setIsOpened, className, children } = props;
  const [readyToOpen, setReadyToOpen] = useState(isOpened);
  const [topMargin, setTopMargin] = useState(0);
  const [leftMargin, setLeftMargin] = useState(0);
  const popupRef = useRef<HTMLDivElement>(null);
  const initTooltip = async () => {
    await setTopMargin(position[1]);
    await setLeftMargin(position[0]);
    await setReadyToOpen(true);
  };

  const finishTooltip = () => {
    setReadyToOpen(false);
  };

  const clickItem = () => {
    setIsOpened(false);
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
        <PopupBackground
          className={className}
          topMargin={topMargin}
          leftMargin={leftMargin}
        >
          <PopupContainer
            topMargin={topMargin}
            leftMargin={leftMargin}
            ref={popupRef}
            onClick={() => clickItem()}
          >
            <ContentWrapper>{children}</ContentWrapper>
          </PopupContainer>
        </PopupBackground>
      )}
    </>
  );
};

export default Tooltip;
