import { AxiosPromise } from 'axios';
import Tweet from 'models/tweet';
import Api from './Api';
import ApiBuilder from './ApiBuilder';

const apiPrefix = 'http://localhost:8000/api';
const tweetsApiPrefix = `${apiPrefix}/tweets`;

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
}

export default TweetsApi;
