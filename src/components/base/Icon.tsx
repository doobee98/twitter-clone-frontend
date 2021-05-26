import styled, { css } from 'styled-components';
import { isEnumType } from 'utils';
import { BasicType, HighlightType, getIconType } from '../../utils/iconUtils';

interface IconWrapperProps {
  isCircle: boolean;
}

const IconWrapper = styled.div<IconWrapperProps>`
  border-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;

  & > svg {
    width: ${(props) => (props.isCircle ? '67%' : '100%')};
    height: ${(props) => (props.isCircle ? '67%' : '100%')};
  }

  ${(props) =>
    props.isCircle &&
    css`
      border-radius: 9999px;
    `};
`;

interface IconProps {
  iconType: BasicType | HighlightType;
  isHighlighted?: boolean;
  hasCircleWrapper?: boolean;
  className?: string;
}

const Icon: React.FC<IconProps> = (props) => {
  const { iconType, isHighlighted, hasCircleWrapper, className } = props;

  const IconComponent = isEnumType(BasicType, iconType)
    ? getIconType(iconType)
    : getIconType(iconType, isHighlighted ?? false);

  return (
    <IconWrapper className={className} isCircle={hasCircleWrapper ?? false}>
      <IconComponent />
    </IconWrapper>
  );
};

export default Icon;
