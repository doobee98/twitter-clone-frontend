import { AxiosPromise } from 'axios';
import User from 'models/user';
import Api from './Api';
import ApiBuilder from './ApiBuilder';

const apiPrefix = 'http://localhost:8000/api';
const authApiPrefix = `${apiPrefix}/auth`;

class AuthApi extends Api {
  apiEndPoints = {
    LOGIN: `${authApiPrefix}/login`,
    LOGOUT: `${authApiPrefix}/logout`,
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
