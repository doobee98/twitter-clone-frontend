import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from 'components/base/Button';
import Icon from 'components/base/Icon';
import TweetPost from 'components/post/TweetPost';
import { useRootDispatch } from 'hooks/redux';
import useClickOutside from 'hooks/useClickOutside';
import { modalActions } from 'modules/modal';
import { ColorPalette, hexToRgbA } from 'utils/colorUtils';
import { BasicType } from 'utils/iconUtils';
import Modal from './Modal';
import PopupBackground from './PopupBackground';

const PostPopupModalHeaderWrapper = styled.div`
  border-bottom: 1px solid ${hexToRgbA(ColorPalette.BLACK, 0.2)};
  margin-bottom: 10px;
  height: 50px;
`;

const CloseButton = styled(Button)`
  width: 40px;
  height: 40px;
  margin: 8px;
  color: ${ColorPalette.SKYBLUE};

  &:hover {
    background-color: ${hexToRgbA(ColorPalette.SKYBLUE, 0.1)};
  }
`;

interface PostPopupModalHeaderProps {
  onClose: () => void;
}

const PostPopupModalHeader: React.FC<PostPopupModalHeaderProps> = (props) => {
  const { onClose } = props;
  return (
    <PostPopupModalHeaderWrapper onClick={onClose}>
      <CloseButton>
        <Icon iconType={BasicType.CLOSE} iconSize={20} />
      </CloseButton>
    </PostPopupModalHeaderWrapper>
  );
};

const PostPopupModalContentWrapper = styled.div`
  width: 88%;
  padding: 0 12px 0 16px;

  &:last-child {
    border: none;
  }
`;

interface PostPopupModalContentProps {
  onCreateTweet: () => void;
}

const PostPopupModalContent: React.FC<PostPopupModalContentProps> = (props) => {
  const { onCreateTweet } = props;
  return (
    <PostPopupModalContentWrapper>
      <TweetPost onCreatePost={onCreateTweet} />
    </PostPopupModalContentWrapper>
  );
};

interface PostPopupModalProps {
  isOpened: boolean;
  className?: string;
}

const PostPopupModal: React.FC<PostPopupModalProps> = (props) => {
  const { isOpened } = props;
  const popupRef = useRef<HTMLDivElement>(null);
  const dispatch = useRootDispatch();

  const initLock = async () => {
    document.body.style.paddingRight = ` ${
      window.innerWidth - document.documentElement.clientWidth
    }px`;
    document.body.style.overflowY = 'hidden';
  };

  const finishLock = () => {
    document.body.style.overflowY = 'unset';
    document.body.style.paddingRight = ` ${0}px`;
  };

  useEffect(() => {
    if (isOpened) initLock();
    else finishLock();
  }, [isOpened]);

  const closePopup = () => {
    dispatch(modalActions.closePostModal());
  };

  useClickOutside(popupRef, () => {
    closePopup();
  });

  if (!isOpened) {
    return null;
  }

  return (
    <PopupBackground>
      <Modal width={600}>
        <div ref={popupRef}>
          <PostPopupModalHeader onClose={() => closePopup()} />
          <PostPopupModalContent onCreateTweet={() => closePopup()} />
        </div>
      </Modal>
    </PopupBackground>
  );
};

export default PostPopupModal;
