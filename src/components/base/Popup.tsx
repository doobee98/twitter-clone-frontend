import useClickOutside from 'hooks/useClickOutside';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ColorPalette, hexToRgbA } from 'utils/colorUtils';
import { BasicType } from 'utils/iconUtils';
import NavItem from './NavItem';

const PopupBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;

  width: 100%;
  height: 100%;
  margin: 0;
  background-color: ${hexToRgbA(ColorPalette.BLACK, 0.4)};

  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

interface PopupContainerProps {
  topMargin: number;
}

const PopupContainer = styled.div<PopupContainerProps>`
  background-color: ${ColorPalette.WHITE};
  border-radius: 25px;
  margin-top: ${(props) => props.topMargin + 80}px;
  width: 560px;
`;

const PopupHeader = styled.div`
  padding: 0px 16px;
  border-bottom: 1px solid ${ColorPalette.LIGHTDARK};
`;

const CloseButton = styled(NavItem)`
  color: ${ColorPalette.SKYBLUE};
  width: 40px;
`;

interface PopupProps {
  isOpened: boolean;
  onClose: () => void;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

const Popup: React.FC<PopupProps> = (props) => {
  const { isOpened, onClose, setIsOpened, className, children } = props;
  const [readyToOpen, setReadyToOpen] = useState(isOpened);
  const [topMargin, setTopMargin] = useState(0);
  const popupRef = useRef<HTMLDivElement>(null);

  const disableScroll = async () => {
    const offsetY = window.pageYOffset;
    await setTopMargin(offsetY);
    document.body.style.top = `${-offsetY}px`;
    document.body.classList.add('scroll-lock');
    setReadyToOpen(true);
  };

  const activateScroll = () => {
    const offsetY = Math.abs(parseInt(document.body.style.top || '0', 10));
    document.body.classList.remove('scroll-lock');
    document.body.style.removeProperty('top');
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
    disableScroll();
    return activateScroll;
  }, [isOpened]);

  return (
    <>
      {readyToOpen && (
        <PopupBackground className={className}>
          <PopupContainer topMargin={topMargin} ref={popupRef}>
            <PopupHeader onClick={onClose}>
              <CloseButton iconType={BasicType.CLOSE} />
            </PopupHeader>
            {children}
          </PopupContainer>
        </PopupBackground>
      )}
    </>
  );
};

export default Popup;
