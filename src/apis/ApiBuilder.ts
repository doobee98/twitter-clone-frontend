import axios, { AxiosPromise, Method as RequestMethod } from 'axios';
import storage, { AUTH_TOKEN_NAME } from 'utils/storage';

const defaultConfig = {
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
};

class ApiBuilder {
  private _method!: RequestMethod;

  private _data!: Record<string, unknown>;

  private _url!: string;

  private _headers: Record<string, unknown>;

  private _timeout: number;

  private _params!: Record<string, unknown>;

  public constructor() {
    this._timeout = defaultConfig.timeout;
    this._headers = {
      ...defaultConfig.headers,
      Authorization: storage.getItem(AUTH_TOKEN_NAME),
    };
  }

  public static create(): ApiBuilder {
    return new ApiBuilder();
  }

  public get(): this {
    this._method = 'GET';
    return this;
  }

  public post(): this {
    this._method = 'POST';
    return this;
  }

  public delete(): this {
    this._method = 'DELETE';
    return this;
  }

  public put(): this {
    this._method = 'PUT';
    return this;
  }

  public url(url: string): this {
    this._url = url;
    return this;
  }

  public timeout(timeout: number): this {
    this._timeout = timeout;
    return this;
  }

  public data(data: Record<string, unknown>): this {
    this._data = data;
    return this;
  }

  public headers(headers: Record<string, unknown>): this {
    this._headers = {
      ...this._headers,
      ...headers,
    };
    return this;
  }

  public params(params: Record<string, unknown>): this {
    this._params = params;
    return this;
  }

  public build(): AxiosPromise {
    return axios({
      method: this._method,
      headers: this._headers,
      url: this._url,
      data: this._data,
      timeout: this._timeout,
      params: this._params,
    });
  }
}

export default ApiBuilder;
