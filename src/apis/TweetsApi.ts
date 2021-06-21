import { AxiosPromise } from 'axios';
import Tweet from 'models/tweet';
import Api from './Api';
import ApiBuilder from './ApiBuilder';
import config from '../config';

const tweetsApiPrefix = `${config.apiHost}/tweets`;

class TweetsApi extends Api {
  apiEndPoints = {
    CREATE_TWEET: `${tweetsApiPrefix}/`,
    FEED: `${tweetsApiPrefix}/feed`,
    TWEET: (id: string) => `${tweetsApiPrefix}/${id}`,
    RETWEET: (id: string) => `${tweetsApiPrefix}/${id}/retweet`,
    REPLY: (id: string) => `${tweetsApiPrefix}/${id}/reply`,
    TWEET_LIKE: (id: string) => `${tweetsApiPrefix}/${id}/like`,
  };

  private static _instance: TweetsApi;

  static get instance(): TweetsApi {
    if (this._instance === undefined) {
      this._instance = new TweetsApi();
    }
    return this._instance;
  }

  createTweet(content: string, image_src_list?: string[]): AxiosPromise<Tweet> {
    return ApiBuilder.create()
      .post()
      .url(this.apiEndPoints.CREATE_TWEET)
      .data({ content, image_src_list })
      .build();
  }

  getTweet(tweet_id: string): AxiosPromise<Tweet> {
    return ApiBuilder.create()
      .get()
      .url(this.apiEndPoints.TWEET(tweet_id))
      .build();
  }

  updateTweet(
    tweet_id: string,
    content?: string,
    image_src_list?: string[],
  ): AxiosPromise<Tweet> {
    return ApiBuilder.create()
      .put()
      .url(this.apiEndPoints.TWEET(tweet_id))
      .data({ content, image_src_list })
      .build();
  }

  deleteTweet(tweet_id: string): AxiosPromise<void> {
    return ApiBuilder.create()
      .delete()
      .url(this.apiEndPoints.TWEET(tweet_id))
      .build();
  }

  getFeed(offset: number, count: number): AxiosPromise<Tweet[]> {
    return ApiBuilder.create()
      .post()
      .url(this.apiEndPoints.FEED)
      .data({ offset, count })
      .build();
  }

  replyTweet(
    original_tweet_id: string,
    content: string,
    image_src_list?: string[],
  ): AxiosPromise<Tweet> {
    return ApiBuilder.create()
      .post()
      .url(this.apiEndPoints.REPLY(original_tweet_id))
      .data({ content, image_src_list })
      .build();
  }

  retweetTweet(tweet_id: string): AxiosPromise<void> {
    return ApiBuilder.create()
      .post()
      .url(this.apiEndPoints.RETWEET(tweet_id))
      .build();
  }

  unretweetTweet(tweet_id: string): AxiosPromise<void> {
    return ApiBuilder.create()
      .delete()
      .url(this.apiEndPoints.RETWEET(tweet_id))
      .build();
  }

  likeTweet(tweet_id: string): AxiosPromise<void> {
    return ApiBuilder.create()
      .post()
      .url(this.apiEndPoints.TWEET_LIKE(tweet_id))
      .build();
  }

  dislikeTweet(tweet_id: string): AxiosPromise<void> {
    return ApiBuilder.create()
      .delete()
      .url(this.apiEndPoints.TWEET_LIKE(tweet_id))
      .build();
  }
}

export default TweetsApi;
