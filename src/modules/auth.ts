import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '../models/user';
import { LoginRequest, SignUpRequest } from '../models/request/auth';

interface AuthState {
  currentUser?: User;
}

const initialState: AuthState = {};

// [TODO: NEED TO BE REMOVED] default user login data for test
const defaultCurrentUser: User = {
  id: 'doobee98',
  username: '이두섭',
  following_num: 20,
  follower_num: 2,
};

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginRequest>) => ({
      currentUser: { ...defaultCurrentUser },
    }),
    logout: () => ({
      currentUser: undefined,
    }),
    signup: (state, action: PayloadAction<SignUpRequest>) => ({
      currentUser: {
        id: action.payload.id,
        username: action.payload.username,
        following_num: 0,
        follower_num: 0,
      },
    }),
  },
});

export const { login, logout, signup } = auth.actions;
export default auth.reducer;
