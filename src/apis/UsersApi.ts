import { AxiosPromise } from 'axios';
import User from 'models/user';
import Api from './Api';
import ApiBuilder from './ApiBuilder';

const apiPrefix = 'http://localhost:8000/api';
const usersApiPrefix = `${apiPrefix}/users`;

class UsersApi extends Api {
  apiEndPoints = {
    USER: (id: string) => `${usersApiPrefix}/${id}`,
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
}

export default UsersApi;
