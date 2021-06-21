import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from '../base/Button';
import Icon from '../base/Icon';
import { useRootDispatch } from '../../hooks/redux';
import useClickOutside from '../../hooks/useClickOutside';
import useInput from '../../hooks/useInput';
import { authActions } from '../../modules/auth';
import { modalActions } from '../../modules/modal';
import { ColorPalette, hexToRgbA } from '../../utils/colorUtils';
import { BasicType } from '../../utils/iconUtils';
import Modal from './Modal';

const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;

  width: 105%;
  height: 100%;
  margin: 0;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  border-collapse: collapse;
  background-color: ${hexToRgbA(ColorPalette.BLACK, 0.4)};
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 30px;
`;

const ModalHeader = styled.div`
  align-self: stretch;
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

const SignupTitle = styled.div`
  font-size: 30px;
  font-weight: bold;
  width: 450px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  margin-top: 20px;
  width: 450px;
  padding: 15px 10px;
  outline: none;
  border: 1px solid ${ColorPalette.GRAY_E6};
  border-radius: 3px;
  font-size: 18px;

  &:focus {
    box-shadow: 0 0 0 2pt ${ColorPalette.SKYBLUE};
  }
`;

const SignupButton = styled(Button)`
  color: ${ColorPalette.WHITE};
  background-color: ${ColorPalette.SKYBLUE};
  width: 350px;
  margin-top: 25px;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background-color: ${ColorPalette.SKYBLUE_DARK};
  }
`;

interface SignupModalProps {
  isOpened: boolean;
  className?: string;
}

const SignupModal: React.FC<SignupModalProps> = (props) => {
  const { isOpened } = props;
  const [id, onChangeId, setId] = useInput('');
  const [password, onChangePassword, setPassword] = useInput('');
  const [username, onChangeUsername, setUsername] = useInput('');

  const modalRef = useRef<HTMLDivElement>(null);
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

  const clearInput = () => {
    setId('');
    setPassword('');
    setUsername('');
  };

  const closeModal = () => {
    dispatch(modalActions.closeSignupModal());
  };

  const fetchSignup = async () => {
    const result = await dispatch(
      authActions.signup({ user_id: id, username, password }),
    );

    if (result.type === 'auth/signup/fulfilled') {
      clearInput();
      closeModal();
    }
  };

  useEffect(() => {
    if (isOpened) {
      initLock();
    } else {
      finishLock();
    }
  }, [isOpened]);

  useClickOutside(modalRef, () => {
    closeModal();
  });

  if (!isOpened) {
    return null;
  }

  return (
    <ModalBackground>
      <Modal width={600}>
        <ModalContainer ref={modalRef}>
          <ModalHeader>
            <CloseButton onClick={closeModal}>
              <Icon iconType={BasicType.CLOSE} iconSize={20} />
            </CloseButton>
          </ModalHeader>
          <SignupTitle>Create New Account</SignupTitle>
          <Input value={id} onChange={onChangeId} placeholder="Id" />
          <Input
            value={username}
            onChange={onChangeUsername}
            placeholder="Username"
          />
          <Input
            type="password"
            value={password}
            onChange={onChangePassword}
            placeholder="Password"
          />
          <SignupButton onClick={fetchSignup}>Sign up</SignupButton>
        </ModalContainer>
      </Modal>
    </ModalBackground>
  );
};

export default SignupModal;
