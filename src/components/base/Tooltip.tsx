import useClickOutside from 'hooks/useClickOutside';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ColorPalette } from 'utils/colorUtils';

const PopupBackground = styled.div`
  position: absolute;
  top: 0;
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
}

const PopupContainer = styled.div<PopupContainerProps>`
  box-shadow: 1px 1px 3px 3px ${ColorPalette.GRAY_E6};

  background-color: ${ColorPalette.WHITE};
  margin-top: ${(props) => props.topMargin + 80}px;
`;

const ContentWrapper = styled.div``;

interface TooltipProps {
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = (props) => {
  const { isOpened, setIsOpened, className, children } = props;
  const [readyToOpen, setReadyToOpen] = useState(isOpened);
  const [topMargin, setTopMargin] = useState(0);
  const popupRef = useRef<HTMLDivElement>(null);

  const initTooltip = async () => {
    const offsetY = window.pageYOffset;
    await setTopMargin(offsetY);
    document.body.style.top = `${-offsetY}px`;
    setReadyToOpen(true);
  };

  const finishTooltip = () => {
    const offsetY = Math.abs(parseInt(document.body.style.top || '0', 10));
    window.scrollTo({ top: offsetY || 0 });
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
    return finishTooltip;
  }, [isOpened]);

  return (
    <>
      {readyToOpen && (
        <PopupBackground className={className}>
          <PopupContainer topMargin={topMargin} ref={popupRef}>
            <ContentWrapper>{children}</ContentWrapper>
          </PopupContainer>
        </PopupBackground>
      )}
    </>
  );
};

export default Tooltip;
