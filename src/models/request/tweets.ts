export interface TweetCreateRequest {
  content: string;
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
