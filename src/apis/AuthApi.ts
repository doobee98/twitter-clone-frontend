import { AxiosPromise } from 'axios';
import User from 'models/user';
import Api from './Api';
import ApiBuilder from './ApiBuilder';
import config from '../config';

const authApiPrefix = `${config.apiHost}/auth`;

class AuthApi extends Api {
  apiEndPoints = {
    LOGIN: `${authApiPrefix}/login`,
    LOGOUT: `${authApiPrefix}/logout`,
    INFO: `${authApiPrefix}/info`,
    SIGNUP: `${authApiPrefix}/signup`,
    CURRENT_USER: `${authApiPrefix}/`, // [TO BE REMOVED] TEST endpoint
  };

  private static _instance: AuthApi;

  static get instance(): AuthApi {
    if (this._instance === undefined) {
      this._instance = new AuthApi();
    }
    return this._instance;
  }

  login(id: string, password: string): AxiosPromise<User> {
    return ApiBuilder.create()
      .post()
      .url(`${this.apiEndPoints.LOGIN}`)
      .data({ id, password })
      .build();
  }

  logout(): AxiosPromise<void> {
    return ApiBuilder.create().get().url(`${this.apiEndPoints.LOGOUT}`).build();
  }

  info(): AxiosPromise<User> {
    return ApiBuilder.create().get().url(`${this.apiEndPoints.INFO}`).build();
  }

  signup(id: string, password: string, username: string): AxiosPromise<User> {
    return ApiBuilder.create()
      .post()
      .url(`${this.apiEndPoints.SIGNUP}`)
      .data({ id, password, username })
      .build();
  }

  // [TO BE REMOVED] TEST method
  checkCurrentUser(): AxiosPromise<User> {
    return ApiBuilder.create()
      .get()
      .url(`${this.apiEndPoints.CURRENT_USER}`)
      .build();
  }
}

export default AuthApi;
