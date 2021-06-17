import styled from 'styled-components';
import { ColorPalette, hexToRgbA } from 'utils/colorUtils';
import { BasicType } from 'utils/iconUtils';
import TweetPost from 'components/post/TweetPost';
import { useEffect, useRef } from 'react';
import { useAppDispatch } from 'hooks/redux';
import { closePostModal } from 'modules/modal';
import useClickOutside from 'hooks/useClickOutside';
import NavItem from '../base/NavItem';
import Modal from './Modal';
import PopupBackground from './PopupBackground';

const PostPopupModalHeaderWrapper = styled.div`
  border-bottom: 1px solid ${hexToRgbA(ColorPalette.BLACK, 0.2)};
  margin-bottom: 10px;
  height: 50px;
`;

const CloseButton = styled(NavItem)`
  color: ${ColorPalette.SKYBLUE};
  width: 40px;
`;

interface PostPopupModalHeaderProps {
  onClose: () => void;
}

const PostPopupModalHeader: React.FC<PostPopupModalHeaderProps> = (props) => {
  const { onClose } = props;
  return (
    <PostPopupModalHeaderWrapper onClick={onClose}>
      <CloseButton iconType={BasicType.CLOSE} />
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
  const dispatch = useAppDispatch();

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
    dispatch(closePostModal());
  };

  useClickOutside(popup, () => {
    closePopup();
  });

  return (
    <>
      {isOpened && (
        <PopupBackground>
          <Modal width={width}>
            <div ref={popup}>
              <PostPopupModalHeader onClose={() => closePopup()} />
              <PostPopupModalContent onCreateTweet={() => closePopup()} />
            </div>
          </Modal>
        </PopupBackground>
      )}
    </>
  );
};

export default PostPopupModal;
