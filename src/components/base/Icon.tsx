import { IconContext } from 'react-icons';
import styled, { css } from 'styled-components';
import { isEnumType } from 'utils';
import { BasicType, HighlightType, getIconType } from '../../utils/iconUtils';

interface IconWrapperProps {
  isCircle: boolean;
  size: number;
}

const IconWrapper = styled.div<IconWrapperProps>`
  border-color: transparent;
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};

  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.isCircle &&
    css`
      border-radius: 9999px;
    `};
`;

interface IconProps {
  iconType: BasicType | HighlightType;
  isHighlighted?: boolean;
  color?: string;
  size?: number;
  hasCircleWrapper?: boolean;
  style?: React.CSSProperties;
}

const Icon: React.FC<IconProps> = (props) => {
  const {
    iconType,
    isHighlighted,
    color,
    size = 20,
    hasCircleWrapper,
    style,
  } = props;

  const IconComponent = isEnumType(BasicType, iconType)
    ? getIconType(iconType)
    : getIconType(iconType, isHighlighted ?? false);

  const wrapperSize = size;
  const iconSize = hasCircleWrapper ? size / 1.414 : size;
  const customIconStyle = {
    color,
    size: `${iconSize}px`,
    style,
  };

  return (
    <IconWrapper isCircle={hasCircleWrapper ?? false} size={wrapperSize}>
      <IconContext.Provider value={customIconStyle}>
        <IconComponent />
      </IconContext.Provider>
    </IconWrapper>
  );
};

export default Icon;
