import Button from 'components/base/Button';
import Icon from 'components/base/Icon';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
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

const LoginHelpItem = styled(Link)`
  &:hover {
    color: ${ColorPalette.SKYBLUE};
    text-decoration: underline;
  }
`;

const LoginMain: React.FC = () => {
  return (
    <LoginMainContainer>
      <TwitterIcon iconType={BasicType.TWITTER} iconSize={40} />
      <LoginTitle>Log in to Twitter</LoginTitle>
      <LoginInput placeholder="Username" />
      <LoginInput placeholder="Password" />
      <LoginButton>Log in</LoginButton>
      <LoginHelpContainer>
        <LoginHelpItem to="/signup">Sign Up for Twitter</LoginHelpItem>
      </LoginHelpContainer>
    </LoginMainContainer>
  );
};

export default LoginMain;
