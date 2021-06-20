/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UsersApi from 'apis/UsersApi';
import User from '../models/user';

const name = 'userRecord';

export interface UserRecordState {
  userRecord: Record<string, User>;
}

const initialState: UserRecordState = { userRecord: {} };

export const fetchUser = createAsyncThunk(
  `${name}/fetchUser`,
  async (userId: string, thunkAPI) => {
    try {
      const response = await UsersApi.instance.getUser(userId);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getUser = createAsyncThunk(
  `${name}/getUser`,
  async (userId: string, thunkAPI) => {
    try {
      const rootState = thunkAPI.getState() as any;
      const { userRecord } = rootState.userRecord as UserRecordState;

      if (userId in userRecord) {
        return userRecord[userId];
      }

      // fetchUser
      const response = await UsersApi.instance.getUser(userId);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const followUser = createAsyncThunk(
  `${name}/followUser`,
  async (userId: string, thunkAPI) => {
    try {
      await UsersApi.instance.followUser(userId);
      return userId;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const unfollowUser = createAsyncThunk(
  `${name}/unfollowUser`,
  async (userId: string, thunkAPI) => {
    try {
      await UsersApi.instance.unfollowUser(userId);
      return userId;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const userRecord = createSlice({
  name,
  initialState,
  reducers: {
    clearUserRecord: (state, action) => {
      state.userRecord = {};
    },
  },
  extraReducers: {
    [fetchUser.fulfilled.type]: (state, action) => {
      const user: User = action.payload;
      state.userRecord[user.user_id] = user;
    },
    [fetchUser.rejected.type]: (state, error) => {
      console.log(error.payload);
      // window.alert(error.payload.msg);
    },
    [getUser.fulfilled.type]: (state, action) => {
      const user: User = action.payload;
      state.userRecord[user.user_id] = user;
    },
    [getUser.rejected.type]: (state, error) => {
      console.log(error.payload);
      // window.alert(error.payload.msg);
    },
    [followUser.fulfilled.type]: (state, action) => {
      const userId = action.payload;
      state.userRecord[userId].following_flag = true;
      state.userRecord[userId].follower_count += 1;
    },
    [followUser.rejected.type]: (state, error) => {
      console.log(error.payload);
    },
    [unfollowUser.fulfilled.type]: (state, action) => {
      const userId = action.payload;
      state.userRecord[userId].following_flag = false;
      state.userRecord[userId].follower_count -= 1;
    },
    [unfollowUser.rejected.type]: (state, error) => {
      console.log(error.payload);
    },
  },
});

export default userRecord.reducer;
export const { clearUserRecord } = userRecord.actions;
