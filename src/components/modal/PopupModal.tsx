import useClickOutside from 'hooks/useClickOutside';
import { Children, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ColorPalette, hexToRgbA } from 'utils/colorUtils';
import { BasicType } from 'utils/iconUtils';
import TweetPost from '../post/TweetPost';
import NavItem from '../base/NavItem';
import Modal from '../base/Modal';

const PopupHeader = styled.div`
  padding: 0;
`;

const CloseButton = styled(NavItem)`
  color: ${ColorPalette.SKYBLUE};
  width: 40px;
`;

interface PopupModalHeaderProps {
  onClose: () => void;
}

const PopupModalHeader: React.FC<PopupModalHeaderProps> = (props) => {
  const { onClose } = props;
  return (
    <PopupHeader onClick={onClose}>
      <CloseButton iconType={BasicType.CLOSE} />
    </PopupHeader>
  );
};

const PostContentWrapper = styled.div`
  & :last-child {
    border: none;
  }
`;

const PostContent: React.FC = () => {
  return (
    <PostContentWrapper>
      <TweetPost />
    </PostContentWrapper>
  );
};

interface PopupModalProps {
  width: number;
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

const PopupModal: React.FC<PopupModalProps> = (props) => {
  const { isOpened, width, setIsOpened, className, children } = props;

  const closePopup = () => {
    setIsOpened(false);
  };

  return (
    <>
      <Modal
        position={[0, 0]}
        width={width}
        isLocked
        isOpened={isOpened}
        setIsOpened={setIsOpened}
      >
        <PopupModalHeader onClose={() => closePopup()} />
        <PostContent />
      </Modal>
    </>
  );
};

export default PopupModal;
