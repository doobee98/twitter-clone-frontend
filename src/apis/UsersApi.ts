import { AxiosPromise } from 'axios';
import { TweetList } from 'models/tweet';
import User from 'models/user';
import Api from './Api';
import ApiBuilder from './ApiBuilder';
import config from '../config';

const usersApiPrefix = `${config.apiHost}/users`;

class UsersApi extends Api {
  apiEndPoints = {
    USER: (id: string) => `${usersApiPrefix}/${id}`,
    USER_FEED: (id: string) => `${usersApiPrefix}/${id}/feed`,
    USER_FOLLOW: (id: string) => `${usersApiPrefix}/${id}/follow`,
    USER_SEARCH: `${usersApiPrefix}/search`,
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

  searchUser(keyword: string): AxiosPromise<User[]> {
    return ApiBuilder.create()
      .get()
      .url(this.apiEndPoints.USER_SEARCH)
      .params({ keyword })
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
