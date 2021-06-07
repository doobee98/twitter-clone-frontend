import { IconContext } from 'react-icons';
import styled from 'styled-components';
import { isEnumType } from 'utils';
import { BasicType, HighlightType, getIconType } from '../../utils/iconUtils';

const IconWrapper = styled.div`
  border-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface IconProps {
  iconType: BasicType | HighlightType;
  isHighlighted?: boolean;
  iconSize?: number;
  iconStyle?: React.CSSProperties;
  className?: string;
}

const Icon: React.FC<IconProps> = (props) => {
  const {
    iconType,
    isHighlighted,
    iconSize = 20,
    iconStyle,
    className,
  } = props;

  const IconComponent = isEnumType(BasicType, iconType)
    ? getIconType(iconType)
    : getIconType(iconType, isHighlighted ?? false);

  const customIconStyle = {
    size: `${iconSize}px`,
    iconStyle,
  };

  return (
    <IconWrapper className={className}>
      <IconContext.Provider value={customIconStyle}>
        <IconComponent />
      </IconContext.Provider>
    </IconWrapper>
  );
};

export default Icon;
