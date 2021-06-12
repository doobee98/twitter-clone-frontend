import styled from 'styled-components';
import { ColorPalette, hexToRgbA } from 'utils/colorUtils';
import { BasicType } from 'utils/iconUtils';
import TweetPost from 'components/post/TweetPost';
import NavItem from '../base/NavItem';
import Modal from '../base/Modal';

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

const PostPopupModalContent: React.FC = () => {
  return (
    <PostPopupModalContentWrapper>
      <TweetPost />
    </PostPopupModalContentWrapper>
  );
};

interface PostPopupModalProps {
  width: number;
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

const PostPopupModal: React.FC<PostPopupModalProps> = (props) => {
  const { isOpened, width, setIsOpened } = props;

  const closePopup = () => {
    setIsOpened(false);
  };

  return (
    <>
      <Modal
        width={width}
        isLocked
        isOpened={isOpened}
        setIsOpened={setIsOpened}
      >
        <PostPopupModalHeader onClose={() => closePopup()} />
        <PostPopupModalContent />
      </Modal>
    </>
  );
};

export default PostPopupModal;
