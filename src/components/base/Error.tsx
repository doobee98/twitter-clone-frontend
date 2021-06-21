import styled from 'styled-components';
import { ColorPalette } from 'utils/colorUtils';
import { BasicType, HighlightType } from 'utils/iconUtils';
import Icon from './Icon';

const ErrorWrapper = styled.div`
  min-width: 200px;
  min-height: 160px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ErrorIcon = styled(Icon)`
  color: ${ColorPalette.RED};
`;

const Title = styled.div`
  margin-top: 20px;
  color: ${ColorPalette.BLACK};
  font-size: 20px;
  font-weight: bold;
`;

const Description = styled.div`
  margin-top: 14px;
  color: ${ColorPalette.GRAY_70};
  font-size: 14px;
`;

interface ErrorProps {
  title: string;
  description?: string;
  iconType?: BasicType | HighlightType;
}

const Error: React.FC<ErrorProps> = (props) => {
  const { title, description, iconType = BasicType.ERROR } = props;

  return (
    <ErrorWrapper>
      <ErrorIcon iconType={iconType} iconSize={60} />
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
    </ErrorWrapper>
  );
};

export default Error;
