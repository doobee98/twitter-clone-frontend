import { IconType } from 'react-icons';
import {
  BsBell,
  BsBellFill,
  BsPerson,
  BsPersonFill,
  BsFillPeopleFill,
  BsChatDots,
  BsGraphUp,
  BsQuestionCircle,
  BsDisplay,
} from 'react-icons/bs';
import { CgMoreO, CgShortcut } from 'react-icons/cg';
import { FaBookmark, FaRegBookmark, FaTwitter } from 'react-icons/fa';
import { FiMoreHorizontal } from 'react-icons/fi';
import { HiHashtag, HiOutlineHashtag } from 'react-icons/hi';
import { MdMail, MdMailOutline, MdClose } from 'react-icons/md';
import {
  RiHome4Line,
  RiHome4Fill,
  RiFileList2Fill,
  RiFileList2Line,
  RiBarChartHorizontalFill,
  RiEarthLine,
  RiAdvertisementLine,
} from 'react-icons/ri';
import {
  AiOutlinePicture,
  AiOutlineGif,
  AiOutlineSchedule,
  AiOutlineThunderbolt,
  AiOutlineSetting,
} from 'react-icons/ai';
import { BiAt, BiNews } from 'react-icons/bi';
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
  CLOSE = 'basic-close',
  MEDIA = 'basic-media',
  GIF = 'basic-gif',
  POLL = 'basic-poll',
  EMOJI = 'basic-emoji',
  SCHEDULE = 'basic-schedule',
  EARTH = 'highlight-earth',
  FRIENDS = 'basic-friends',
  AT = 'basic-at',
  //   tooltip icons
  CHAT = 'basic-chat-bubble',
  THUNDER = 'basic-thunder',
  NEWS = 'basic-news',
  AD = 'basic-ads',
  GRAPH = 'basic-graph',
  SETTING = 'basic-setting',
  QUESTION = 'basic-question',
  DISPLAY = 'basic-display',
  SHORTCUT = 'basic-shortcut',
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
  [BasicType.CLOSE]: MdClose,
  [BasicType.MEDIA]: AiOutlinePicture,
  [BasicType.GIF]: AiOutlineGif,
  [BasicType.POLL]: RiBarChartHorizontalFill,
  [BasicType.EMOJI]: VscSmiley,
  [BasicType.SCHEDULE]: AiOutlineSchedule,
  [BasicType.FRIENDS]: BsFillPeopleFill,
  [BasicType.AT]: BiAt,
  [BasicType.EARTH]: RiEarthLine,
  // tooltip icons
  [BasicType.CHAT]: BsChatDots,
  [BasicType.THUNDER]: AiOutlineThunderbolt,
  [BasicType.NEWS]: BiNews,
  [BasicType.AD]: RiAdvertisementLine,
  [BasicType.GRAPH]: BsGraphUp,
  [BasicType.QUESTION]: BsQuestionCircle,
  [BasicType.DISPLAY]: BsDisplay,
  [BasicType.SHORTCUT]: CgShortcut,
  [BasicType.SETTING]: AiOutlineSetting,
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
