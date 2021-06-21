/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthApi from 'apis/AuthApi';
import storage, { AUTH_TOKEN_NAME } from 'utils/storage';
import User from '../models/user';
import {
  LoginRequest,
  SignUpRequest,
  EditRequest,
} from '../models/request/auth';

const name = 'auth';

export interface AuthState {
  currentUser?: User;
}

const initialState: AuthState = {};

const login = createAsyncThunk(
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

const logout = createAsyncThunk(`${name}/logout`, async (_, thunkAPI) => {
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
});

const info = createAsyncThunk(`${name}/info`, async (_, thunkAPI) => {
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

const signup = createAsyncThunk(
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

const edit = createAsyncThunk(
  `${name}/edit`,
  async (editRequest: EditRequest, thunkAPI) => {
    try {
      const { username, profile_img_src, bio, website, location } = editRequest;
      const response = await AuthApi.instance.editInfo(
        username || undefined,
        profile_img_src || undefined,
        bio || undefined,
        website || undefined,
        location || undefined,
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
      state.currentUser = user;
    },
    [login.rejected.type]: (state, error) => {
      console.log(error.payload);
      window.alert(error.payload.msg);
    },
    [logout.fulfilled.type]: (state) => {
      state.currentUser = undefined;
    },
    [logout.rejected.type]: (state, error) => {
      console.log(error.payload);
      window.alert(error.payload.msg);
    },
    [info.fulfilled.type]: (state, action) => {
      const user = action.payload;
      state.currentUser = user;
    },
    [info.rejected.type]: (state, error) => {
      console.log(error.payload);
      storage.removeItem(AUTH_TOKEN_NAME);
    },
    [signup.fulfilled.type]: (state, action) => {
      window.alert(`${action.payload.user_id}님 회원가입 완료!`);
    },
    [signup.rejected.type]: (state, error) => {
      console.log(error.payload);
      if (error.payload.msg) {
        window.alert(error.payload.msg);
      }
      return state;
    },
    [edit.fulfilled.type]: (state, action) => {
      return state;
    },
    [edit.rejected.type]: (state, error) => {
      console.log(error.payload);
      if (error.payload.msg) {
        window.alert(error.payload.msg);
      }
      return state;
    },
  },
});

export const authActions = { login, logout, info, signup, edit };
export default auth.reducer;
