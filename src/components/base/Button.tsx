import styled from 'styled-components';
import { ColorPalette } from 'utils/colorUtils';

const ButtonWrapper = styled.button`
  border-color: transparent;
  border-radius: 9999px;
  padding: 10px;
  font-size: 15px;

  cursor: pointer;
  color: ${ColorPalette.BLACK};
  background-color: ${ColorPalette.WHITE};

  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: auto;
    opacity: 0.5;
  }
`;

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { type = 'button', disabled, onClick, className, children } = props;

  return (
    <ButtonWrapper
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </ButtonWrapper>
  );
};

export default Button;
