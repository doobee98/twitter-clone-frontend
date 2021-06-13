import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import LoginMain from 'components/login/LoginMain';
import { useAuthSelector } from 'hooks/redux';
import useTitle from 'hooks/useTitle';

const LoginPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const LoginPage: React.FC = () => {
  const authStore = useAuthSelector();
  const { currentUser } = authStore;

  useTitle('Login / Twitter-Clone');

  if (currentUser) {
    return <Redirect to="/home" />;
  }

  return (
    <LoginPageWrapper>
      <LoginMain />
    </LoginPageWrapper>
  );
};

export default LoginPage;
