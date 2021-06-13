import React from 'react';
import styled from 'styled-components';
import LoginMain from 'components/login/LoginMain';

const LoginPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const LoginPage: React.FC = () => {
  return (
    <LoginPageWrapper>
      <LoginMain />
    </LoginPageWrapper>
  );
};

export default LoginPage;
