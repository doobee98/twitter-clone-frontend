import { IconContext, IconType } from 'react-icons';
import { BsBell, BsBellFill, BsPerson, BsPersonFill } from 'react-icons/bs';
import { CgMoreO } from 'react-icons/cg';
import { FaBookmark, FaRegBookmark, FaTwitter } from 'react-icons/fa';
import { HiHashtag, HiOutlineHashtag } from 'react-icons/hi';
import { MdMail, MdMailOutline } from 'react-icons/md';
import {
  RiHome4Line,
  RiHome4Fill,
  RiFileList2Fill,
  RiFileList2Line,
} from 'react-icons/ri';

/* 
  How to Search Icon: https://react-icons.github.io/react-icons
*/

interface IconProviderProps {
  icon: IconType;
  color?: string;
  size?: string;
  style?: React.CSSProperties;
}

export const IconProvider: React.FC<IconProviderProps> = (props) => {
  const { icon: IconComponent, color, size, style } = props;
  const iconStyle = {
    color,
    size,
    style,
  };

  return (
    <IconContext.Provider value={iconStyle}>
      <IconComponent />
    </IconContext.Provider>
  );
};

interface IconProps {
  color?: string;
  size?: string;
  style?: React.CSSProperties;
}

interface HighlightableIconProps extends IconProps {
  isHighlighted: boolean;
}

export const TwitterIcon: React.FC<IconProps> = (props) => {
  const { color, size, style } = props;
  const icon = FaTwitter;

  return <IconProvider icon={icon} color={color} size={size} style={style} />;
};

export const HomeIcon: React.FC<HighlightableIconProps> = (props) => {
  const { isHighlighted, color, size, style } = props;
  const icon = isHighlighted ? RiHome4Fill : RiHome4Line;

  return <IconProvider icon={icon} color={color} size={size} style={style} />;
};

export const ExploreIcon: React.FC<HighlightableIconProps> = (props) => {
  const { isHighlighted, color, size, style } = props;
  const icon = isHighlighted ? HiHashtag : HiOutlineHashtag;

  return <IconProvider icon={icon} color={color} size={size} style={style} />;
};

export const NotificationsIcon: React.FC<HighlightableIconProps> = (props) => {
  const { isHighlighted, color, size, style } = props;
  const icon = isHighlighted ? BsBellFill : BsBell;

  return <IconProvider icon={icon} color={color} size={size} style={style} />;
};

export const MessagesIcon: React.FC<HighlightableIconProps> = (props) => {
  const { isHighlighted, color, size, style } = props;
  const icon = isHighlighted ? MdMail : MdMailOutline;

  return <IconProvider icon={icon} color={color} size={size} style={style} />;
};

export const BookmarksIcon: React.FC<HighlightableIconProps> = (props) => {
  const { isHighlighted, color, size, style } = props;
  const icon = isHighlighted ? FaBookmark : FaRegBookmark;

  return <IconProvider icon={icon} color={color} size={size} style={style} />;
};

export const ListsIcon: React.FC<HighlightableIconProps> = (props) => {
  const { isHighlighted, color, size, style } = props;
  const icon = isHighlighted ? RiFileList2Fill : RiFileList2Line;

  return <IconProvider icon={icon} color={color} size={size} style={style} />;
};

export const ProfileIcon: React.FC<HighlightableIconProps> = (props) => {
  const { isHighlighted, color, size, style } = props;
  const icon = isHighlighted ? BsPersonFill : BsPerson;

  return <IconProvider icon={icon} color={color} size={size} style={style} />;
};

export const MoreIcon: React.FC<IconProps> = (props) => {
  const { color, size, style } = props;
  const icon = CgMoreO;

  return <IconProvider icon={icon} color={color} size={size} style={style} />;
};
