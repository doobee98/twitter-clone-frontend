export default interface Tweet {
  type: 'tweet' | 'retweet' | 'reply';
  tweet_id: string;
  tweeted_at: string;
  writer_id: string;
  writer_name: string;
  wrtier_profile_img_src?: string;

  content: string;
  image_src_list?: string[];

  reply_count: number;
  retweet_count: number;
  like_count: number;

  retweet_flag: boolean;
  like_flag: boolean;

  retweet_wrtier_id?: string;
  retweetw_at?: string;
  reply_id?: string;
}

export interface TweetList {
  totalCount: number;
  data: Tweet[];
}
