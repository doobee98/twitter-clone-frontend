import { IconType } from 'react-icons';
import { BsBell, BsBellFill, BsPerson, BsPersonFill } from 'react-icons/bs';
import { CgMoreO } from 'react-icons/cg';
import { FaBookmark, FaRegBookmark, FaTwitter } from 'react-icons/fa';
import { FiMoreHorizontal } from 'react-icons/fi';
import { HiHashtag, HiOutlineHashtag } from 'react-icons/hi';
import { MdMail, MdMailOutline } from 'react-icons/md';
import {
  RiHome4Line,
  RiHome4Fill,
  RiFileList2Fill,
  RiFileList2Line,
} from 'react-icons/ri';
import { isEnumType } from 'utils';

/* 
  Basic Type      : icons with no interactions.
  Highlight Type  : icons able to be highlighted (fill, bold, ...)
*/

export enum BasicType {
  TWITTER = 'basic-twitter',
  MORE_CIRCLE = 'basic-more-circle',
  MORE = 'basic-more',
}

export enum HighlightType {
  HOME = 'highlight-home',
  EXPLORE = 'highlight-explore',
  NOTIFICATIONS = 'highlight-notifications',
  MESSAGES = 'highlight-messages',
  BOOKMARKS = 'highlight-bookmarks',
  LISTS = 'highlight-lists',
  PROFILE = 'highlight-profile',
}

/* 
  How to Search Icon: https://react-icons.github.io/react-icons
*/

const basicRecord = {
  [BasicType.TWITTER]: FaTwitter,
  [BasicType.MORE_CIRCLE]: CgMoreO,
  [BasicType.MORE]: FiMoreHorizontal,
};

// [Icon when highlighted state, Icon when basic state]
const highlightRecord = {
  [HighlightType.HOME]: [RiHome4Fill, RiHome4Line],
  [HighlightType.EXPLORE]: [HiHashtag, HiOutlineHashtag],
  [HighlightType.NOTIFICATIONS]: [BsBellFill, BsBell],
  [HighlightType.MESSAGES]: [MdMail, MdMailOutline],
  [HighlightType.BOOKMARKS]: [FaBookmark, FaRegBookmark],
  [HighlightType.LISTS]: [RiFileList2Fill, RiFileList2Line],
  [HighlightType.PROFILE]: [BsPersonFill, BsPerson],
};

type IgetIconType = {
  (type: BasicType): IconType;
  (type: HighlightType, isHighlighted: boolean): IconType;
};

export const getIconType: IgetIconType = (
  type: BasicType | HighlightType,
  isHighlighted?: boolean,
): IconType => {
  return isEnumType(BasicType, type)
    ? basicRecord[type]
    : highlightRecord[type][isHighlighted ? 0 : 1];
};
