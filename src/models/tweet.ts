export interface Tweet {
  type: 'tweet' | 'retweet' | 'reply';
  tweet_id: string;
  tweeted_at: string;
  writer_id: string;

  content: string;
  image_src_list?: string[];

  reply_count: number;
  retweet_count: number;
  like_count: number;
}
