import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthApi from 'apis/AuthApi';
import storage, { AUTH_TOKEN_NAME } from 'utils/storage';
import User from '../models/user';
import { LoginRequest, SignUpRequest } from '../models/request/auth';

const name = 'auth';

export interface AuthState {
  currentUser?: User;
}

const initialState: AuthState = {};

export const login = createAsyncThunk(
  `${name}/login`,
  async (loginRequest: LoginRequest, thunkAPI) => {
    try {
      const { user_id, password } = loginRequest;
      const response = await AuthApi.instance.login(user_id, password);
      const { data: user, headers } = response;
      storage.setItem(AUTH_TOKEN_NAME, headers.authorization);
      return user as User;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const logout = createAsyncThunk(
  `${name}/logout`,
  async (_, thunkAPI) => {
    try {
      const response = await AuthApi.instance.logout();
      storage.removeItem(AUTH_TOKEN_NAME);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const info = createAsyncThunk(`${name}/info`, async (_, thunkAPI) => {
  try {
    const response = await AuthApi.instance.info();
    return response.data as User;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const signup = createAsyncThunk(
  `${name}/signup`,
  async (signupRequest: SignUpRequest, thunkAPI) => {
    try {
      const { user_id, password, username } = signupRequest;
      const response = await AuthApi.instance.signup(
        user_id,
        password,
        username,
      );
      return response.data as User;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const auth = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
    [login.fulfilled.type]: (state, action) => {
      const user = action.payload;
      return { currentUser: user };
    },
    [login.rejected.type]: (state, error) => {
      console.log(error.payload);
      window.alert(error.payload.msg);
      return state;
    },
    [logout.fulfilled.type]: () => {
      return {
        currentUser: undefined,
      };
    },
    [logout.rejected.type]: (state, error) => {
      console.log(error.payload);
      window.alert(error.payload.msg);
      return state;
    },
    [info.fulfilled.type]: (state, action) => {
      const user = action.payload;
      return { currentUser: user };
    },
    [info.rejected.type]: (state, error) => {
      console.log(error.payload);
      storage.removeItem(AUTH_TOKEN_NAME);
      return state;
    },
    [signup.fulfilled.type]: (state, action) => {
      window.alert(`${action.payload.user_id}님 회원가입 완료!`);
      return state;
    },
    [signup.rejected.type]: (state, error) => {
      console.log(error.payload);
      return state;
    },
  },
});

export default auth.reducer;
