import styled from 'styled-components';
import { ColorPalette, hexToRgbA } from 'utils/colorUtils';
import { BasicType } from 'utils/iconUtils';
import TweetPost from 'components/post/TweetPost';
import { useEffect, useRef } from 'react';
import { useRootDispatch } from 'hooks/redux';
import { modalActions } from 'modules/modal';
import useClickOutside from 'hooks/useClickOutside';
import Modal from './Modal';
import PopupBackground from './PopupBackground';
import Button from '../base/Button';
import Icon from '../base/Icon';

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
  margin-bottom: 10px;
  & :last-child {
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
      <TweetPost onCreateTweet={onCreateTweet} />
    </PostPopupModalContentWrapper>
  );
};

interface PostPopupModalProps {
  width: number;
  isOpened: boolean;
  className?: string;
}

const PostPopupModal: React.FC<PostPopupModalProps> = (props) => {
  const { isOpened, width } = props;
  const popup = useRef<HTMLDivElement>(null);
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

  useClickOutside(popup, () => {
    closePopup();
  });

  if (!isOpened) {
    return null;
  }

  return (
    <PopupBackground>
      <Modal width={width}>
        <div ref={popup}>
          <PostPopupModalHeader onClose={() => closePopup()} />
          <PostPopupModalContent onCreateTweet={() => closePopup()} />
        </div>
      </Modal>
    </PopupBackground>
  );
};

export default PostPopupModal;
