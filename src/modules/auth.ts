import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '../models/user';
import { LoginRequest, SignUpRequest } from '../models/request/auth';

interface AuthState {
  currentUser?: User;
}

const initialState: AuthState = {};

// [TODO: NEED TO BE REMOVED] default user login data for test
const defaultCurrentUser: User = {
  user_id: 'doobee98',
  username: '이두섭',
  following_count: 20,
  follower_count: 2,
  joined_at: Date(),
};

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginRequest>) => {
      const { user_id, password } = action.payload;
      return {
        currentUser: { ...defaultCurrentUser },
      };
    },
    logout: () => {
      return {
        currentUser: undefined,
      };
    },
    signup: (state, action: PayloadAction<SignUpRequest>) => {
      const { user_id, password, username } = action.payload;
      return {
        currentUser: {
          user_id,
          username,
          following_count: 0,
          follower_count: 0,
          joined_at: Date(),
        },
      };
    },
  },
});

export const { login, logout, signup } = auth.actions;
export default auth.reducer;
