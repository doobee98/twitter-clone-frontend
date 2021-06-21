import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from 'components/base/Button';
import Icon from 'components/base/Icon';
import TweetDescription from 'components/tweet/TweetDescription';
import TweetPost from 'components/post/TweetPost';
import { useRootDispatch, useModalSelector } from 'hooks/redux';
import useClickOutside from 'hooks/useClickOutside';
import Tweet from 'models/tweet';
import { modalActions } from 'modules/modal';
import { ColorPalette, hexToRgbA } from 'utils/colorUtils';
import { BasicType } from 'utils/iconUtils';
import Modal from './Modal';
import PopupBackground from './PopupBackground';

const ReplyPopupModalHeaderWrapper = styled.div`
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

interface ReplyPopupModalHeaderProps {
  onClose: () => void;
}

const ReplyPopupModalHeader: React.FC<ReplyPopupModalHeaderProps> = (props) => {
  const { onClose } = props;
  return (
    <ReplyPopupModalHeaderWrapper onClick={onClose}>
      <CloseButton>
        <Icon iconType={BasicType.CLOSE} iconSize={20} />
      </CloseButton>
    </ReplyPopupModalHeaderWrapper>
  );
};

const ReplyPopupModalContentWrapper = styled.div`
  margin-bottom: 10px;
  width: 88%;
  padding: 10px 12px 0 24px;

  &:last-child {
    border: none;
  }
`;

interface ReplyPopupModalContentProps {
  tweet: Tweet;
  onCreateTweet: () => void;
}

const ReplyPopupModalContent: React.FC<ReplyPopupModalContentProps> = (
  props,
) => {
  const { tweet, onCreateTweet } = props;
  return (
    <ReplyPopupModalContentWrapper>
      <TweetPost
        isReply
        originalTweetId={tweet.tweet_id}
        onCreatePost={onCreateTweet}
      />
    </ReplyPopupModalContentWrapper>
  );
};

interface ReplyPopupModalProps {
  isOpened: boolean;
  className?: string;
}

const ReplyPopupModal: React.FC<ReplyPopupModalProps> = (props) => {
  const { isOpened } = props;
  const popupRef = useRef<HTMLDivElement>(null);
  const dispatch = useRootDispatch();
  const originalTweet = useModalSelector((state) => state.originalTweet);

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
    dispatch(modalActions.closeReplyModal());
  };

  useClickOutside(popupRef, () => {
    closePopup();
  });

  if (!isOpened) return null;
  if (!originalTweet) return null;

  return (
    <PopupBackground>
      <Modal width={600}>
        <div ref={popupRef}>
          <ReplyPopupModalHeader onClose={closePopup} />
          <TweetDescription tweet={originalTweet} />
          <ReplyPopupModalContent
            tweet={originalTweet}
            onCreateTweet={closePopup}
          />
        </div>
      </Modal>
    </PopupBackground>
  );
};

export default ReplyPopupModal;
