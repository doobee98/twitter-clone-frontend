import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthApi from 'apis/AuthApi';
import storage, { AUTH_TOKEN_NAME } from 'utils/storage';
import User from '../models/user';
import { LoginRequest, SignUpRequest } from '../models/request/auth';

interface AuthState {
  currentUser?: User;
}

const initialState: AuthState = {};

export const login = createAsyncThunk(
  'auth/login',
  async (loginRequest: LoginRequest) => {
    const { user_id, password } = loginRequest;
    const response = await AuthApi.instance.login(user_id, password);
    const { data: user, headers } = response;
    return [user as User, headers.authorization];
  },
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await AuthApi.instance.logout();
  storage.removeItem(AUTH_TOKEN_NAME);
});

export const signup = createAsyncThunk(
  'auth/signup',
  async (signupRequest: SignUpRequest) => {
    const { user_id, password, username } = signupRequest;
    const response = await AuthApi.instance.signup(user_id, password, username);
    return response.data as User;
  },
);

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [login.fulfilled.type]: (state, action) => {
      const [user, token] = action.payload;
      storage.setItem(AUTH_TOKEN_NAME, token);
      return { currentUser: user };
    },
    [login.rejected.type]: (state, error) => {
      console.log(error);
      return state;
    },
    [logout.fulfilled.type]: () => {
      return {
        currentUser: undefined,
      };
    },
    [logout.rejected.type]: (state, error) => {
      console.log(error);
      return state;
    },
    [signup.fulfilled.type]: (state, action) => {
      window.alert(`${action.payload.user_id}님 회원가입 완료!`);
      return state;
    },
    [signup.rejected.type]: (state, error) => {
      console.log(error);
      return state;
    },
  },
});

export default auth.reducer;
