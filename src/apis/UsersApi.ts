import { AxiosPromise } from 'axios';
import Tweet, { TweetList } from 'models/tweet';
import User from 'models/user';
import Api from './Api';
import ApiBuilder from './ApiBuilder';

const apiPrefix = 'http://localhost:8000/api';
const usersApiPrefix = `${apiPrefix}/users`;

class UsersApi extends Api {
  apiEndPoints = {
    USER: (id: string) => `${usersApiPrefix}/${id}`,
    USER_FEED: (id: string) => `${usersApiPrefix}/${id}/feed`,
    USER_FOLLOW: (id: string) => `${usersApiPrefix}/${id}/follow`,
  };

  private static _instance: UsersApi;

  static get instance(): UsersApi {
    if (this._instance === undefined) {
      this._instance = new UsersApi();
    }
    return this._instance;
  }

  getUser(id: string): AxiosPromise<User> {
    return ApiBuilder.create().get().url(this.apiEndPoints.USER(id)).build();
  }

  getUserFeed(
    id: string,
    offset: number,
    count: number,
  ): AxiosPromise<TweetList> {
    return ApiBuilder.create()
      .post()
      .url(this.apiEndPoints.USER_FEED(id))
      .data({ offset, count })
      .build();
  }

  followUser(id: string): AxiosPromise<void> {
    return ApiBuilder.create()
      .post()
      .url(this.apiEndPoints.USER_FOLLOW(id))
      .build();
  }

  unfollowUser(id: string): AxiosPromise<void> {
    return ApiBuilder.create()
      .delete()
      .url(this.apiEndPoints.USER_FOLLOW(id))
      .build();
  }
}

export default UsersApi;
