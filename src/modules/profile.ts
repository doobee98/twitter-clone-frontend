import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UsersApi from 'apis/UsersApi';
import { Tweet } from 'models/tweet';
import User from '../models/user';

const PROFILEPAGE_FEED_INITIAL_COUNT = 10;

const name = 'profile';

interface ProfileState {
  user?: User;
  feed: Tweet[];
  totalCount: number;
}

const initialState: ProfileState = { feed: [], totalCount: 0 };

export const getUser = createAsyncThunk(
  `${name}/getUser`,
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

export const getUserFeed = createAsyncThunk(
  `${name}/getUserFeed`,
  async (userId: string, thunkAPI) => {
    try {
      const rootState = thunkAPI.getState() as any;
      const { feed } = rootState.profile as ProfileState;
      const response = await UsersApi.instance.getUserFeed(
        userId,
        feed.length + 1,
        PROFILEPAGE_FEED_INITIAL_COUNT,
      );
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
      const response = await UsersApi.instance.followUser(userId);
      return response.data;
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
      const response = await UsersApi.instance.unfollowUser(userId);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const profile = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
    [getUser.fulfilled.type]: (state, action) => {
      const user = action.payload;
      return { ...initialState, user };
    },
    [getUser.rejected.type]: (state, error) => {
      console.log(error.payload);
      window.alert(error.payload.msg);
      return state;
    },
    [getUserFeed.fulfilled.type]: (state, action) => {
      const { totalCount, data: newFeed } = action.payload;
      return {
        ...state,
        totalCount,
        feed: [...state.feed, ...newFeed],
      };
    },
    [getUserFeed.rejected.type]: (state, error) => {
      console.log(error.payload);
      return state;
    },
    [followUser.fulfilled.type]: (state, action) => {
      if (!state.user) {
        return state;
      }

      return {
        ...state,
        user: {
          ...state.user,
          following_flag: true,
        },
      };
    },
    [followUser.rejected.type]: (state, error) => {
      console.log(error.payload);
      return state;
    },
    [unfollowUser.fulfilled.type]: (state, action) => {
      if (!state.user) {
        return state;
      }

      return {
        ...state,
        user: {
          ...state.user,
          following_flag: false,
        },
      };
    },
    [unfollowUser.rejected.type]: (state, error) => {
      console.log(error.payload);
      return state;
    },
  },
});

export default profile.reducer;
