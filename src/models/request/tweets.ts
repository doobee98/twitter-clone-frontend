export interface TweetCreateRequest {
  content: string;
  reply_permission?: string;
  image_src_list?: string[];
}

export interface TweetEditRequest {
  content?: string;
  image_src_list?: string[];
}

export interface TweetFeedRequest {
  offset: number;
  count: number;
}

export interface ReplyCreateRequest {
  original_tweet_id: string;
  content: string;
  reply_permission?: string;
  image_src_list?: string[];
}
