import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Button from 'components/base/Button';
import Icon from 'components/base/Icon';
import SignupModal from 'components/modal/SignupModal';
import { useRootDispatch, useModalSelector } from 'hooks/redux';
import useInput from 'hooks/useInput';
import { authActions } from 'modules/auth';
import { modalActions } from 'modules/modal';
import { ColorPalette } from 'utils/colorUtils';
import { BasicType } from 'utils/iconUtils';

const LoginMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TwitterIcon = styled(Icon)`
  color: ${ColorPalette.SKYBLUE};
  align-self: flex-start;
  margin-top: 20px;
`;

const LoginTitle = styled.div`
  font-size: 30px;
  font-weight: bold;
  align-self: flex-start;
  margin-top: 20px;
`;

const LoginInput = styled.input`
  margin-top: 20px;
  align-self: stretch;
  padding: 15px 10px;
  outline: none;
  border: 1px solid ${ColorPalette.GRAY_E6};
  border-radius: 3px;
  font-size: 18px;

  &:focus {
    box-shadow: 0 0 0 2pt ${ColorPalette.SKYBLUE};
  }
`;

const LoginButton = styled(Button)`
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

const LoginHelpContainer = styled.div`
  color: ${ColorPalette.SKYBLUE};
  margin-top: 30px;
`;

const LoginHelpItem = styled.div`
  color: ${ColorPalette.SKYBLUE};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginMain: React.FC = () => {
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');
  const isOpenedSignupModal = useModalSelector(
    (state) => state.isOpenedSignupModal,
  );

  const history = useHistory();
  const dispatch = useRootDispatch();

  const fetchLogin = async () => {
    const result = await dispatch(authActions.login({ user_id: id, password }));

    if (result.type === 'auth/login/fulfilled') {
      history.push('/home');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      fetchLogin();
    }
  };

  const goToSignup = () => {
    dispatch(modalActions.openSignupModal());
  };

  return (
    <>
      <LoginMainContainer onKeyDown={handleKeyDown}>
        <TwitterIcon iconType={BasicType.TWITTER} iconSize={40} />
        <LoginTitle>Log in to Twitter</LoginTitle>
        <LoginInput value={id} onChange={onChangeId} placeholder="Id" />
        <LoginInput
          type="password"
          value={password}
          onChange={onChangePassword}
          placeholder="Password"
        />
        <LoginButton onClick={fetchLogin}>Log in</LoginButton>
        <LoginHelpContainer>
          <LoginHelpItem onClick={goToSignup}>
            Sign Up for Twitter
          </LoginHelpItem>
        </LoginHelpContainer>
      </LoginMainContainer>
      <SignupModal isOpened={isOpenedSignupModal} />
    </>
  );
};

export default LoginMain;
