import React from 'react';
import AuthApi from 'apis/AuthApi';
import useInput from 'hooks/useInput';
import Button from 'components/base/Button';
import { useAppDispatch, useAuthSelector } from 'hooks/redux';
import { login, logout, signup } from 'modules/auth';

// TODO: SignUpPage 따로 만들것
const LoginPage: React.FC = () => {
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [username, onChangeUsername] = useInput('');

  const authStore = useAuthSelector();
  const dispatch = useAppDispatch();

  const { currentUser } = authStore;

  const handleLogin = async () => {
    return dispatch(login({ user_id: id, password }));
  };

  const handleLogout = async () => {
    return dispatch(logout());
  };

  const handleSignup = async () => {
    return dispatch(signup({ user_id: id, password, username }));
  };

  const handleCurrentUser = async () => {
    AuthApi.instance
      .checkCurrentUser()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <>
      <div>로그인 된 유저: {currentUser ? currentUser.user_id : '없음'}</div>
      <div>
        ID:
        <input type="text" value={id} onChange={onChangeId} />
      </div>
      <div>
        Password:
        <input type="password" value={password} onChange={onChangePassword} />
      </div>
      <div>
        Username:
        <input type="text" value={username} onChange={onChangeUsername} />
      </div>
      <Button onClick={handleLogin}>로그인</Button>
      <Button onClick={handleLogout}>로그아웃</Button>
      <Button onClick={handleSignup}>회원가입</Button>
      <Button onClick={handleCurrentUser}>로그인상태</Button>
    </>
  );
};

export default LoginPage;
