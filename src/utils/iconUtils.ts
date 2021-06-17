import { IconType } from 'react-icons';
import {
  BsBell,
  BsBellFill,
  BsPerson,
  BsPersonFill,
  BsFillPeopleFill,
} from 'react-icons/bs';
import { CgMoreO } from 'react-icons/cg';
import { FaBookmark, FaRegBookmark, FaTwitter } from 'react-icons/fa';
import {
  FiMoreHorizontal,
  FiMessageSquare,
  FiRepeat,
  FiHeart,
  FiShare,
  FiAlertTriangle,
  FiLoader,
} from 'react-icons/fi';
import { HiHashtag, HiOutlineHashtag } from 'react-icons/hi';
import { MdMail, MdMailOutline, MdClose } from 'react-icons/md';
import {
  RiHome4Line,
  RiHome4Fill,
  RiFileList2Fill,
  RiFileList2Line,
  RiBarChartHorizontalFill,
  RiEarthLine,
} from 'react-icons/ri';
import {
  AiOutlinePicture,
  AiOutlineGif,
  AiOutlineSchedule,
} from 'react-icons/ai';
import { BiAt } from 'react-icons/bi';
import { VscSmiley } from 'react-icons/vsc';
import { isEnumType } from 'utils';

/* 
  Basic Type      : icons with no interactions.
  Highlight Type  : icons able to be highlighted (fill, bold, ...)
*/

export enum BasicType {
  TWITTER = 'basic-twitter',
  MORE_CIRCLE = 'basic-more-circle',
  MORE = 'basic-more',

  // tweet-post icons
  MEDIA = 'basic-media',
  GIF = 'basic-gif',
  POLL = 'basic-poll',
  EMOJI = 'basic-emoji',
  SCHEDULE = 'basic-schedule',
  EARTH = 'basic-earth',
  FRIENDS = 'basic-friends',
  AT = 'basic-at',

  // tweet-list Bottom icons
  REPLY = 'basic-reply',
  RETWEET = 'basic-retweet',
  LIKE = 'basic-like',
  SHARE = 'basic-share',

  // modal icons
  CLOSE = 'basic-close',
  ALERT = 'basic-alert',
  LOAD = 'basic-load',
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

  // tweet-post icons
  [BasicType.MEDIA]: AiOutlinePicture,
  [BasicType.GIF]: AiOutlineGif,
  [BasicType.POLL]: RiBarChartHorizontalFill,
  [BasicType.EMOJI]: VscSmiley,
  [BasicType.SCHEDULE]: AiOutlineSchedule,

  [BasicType.FRIENDS]: BsFillPeopleFill,
  [BasicType.AT]: BiAt,
  [BasicType.EARTH]: RiEarthLine,

  // tweet-list Bottom icons
  [BasicType.REPLY]: FiMessageSquare,
  [BasicType.RETWEET]: FiRepeat,
  [BasicType.LIKE]: FiHeart,
  [BasicType.SHARE]: FiShare,

  // modal icons
  [BasicType.CLOSE]: MdClose,
  [BasicType.ALERT]: FiAlertTriangle,
  [BasicType.LOAD]: FiLoader,
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
