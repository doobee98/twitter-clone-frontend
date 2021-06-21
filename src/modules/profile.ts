/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UsersApi from 'apis/UsersApi';
import Tweet from 'models/tweet';

const PROFILEPAGE_FEED_INITIAL_COUNT = 10;

const name = 'profile';

export interface ProfileState {
  feed: Tweet[];
  totalCount: number;
}

const initialState: ProfileState = { feed: [], totalCount: 0 };

const getUserFeed = createAsyncThunk(
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

export const profile = createSlice({
  name,
  initialState,
  reducers: {
    clearProfileState: () => initialState,
  },
  extraReducers: {
    [getUserFeed.fulfilled.type]: (state, action) => {
      const { totalCount, data: newFeed } = action.payload;
      state.feed = [...state.feed, ...newFeed];
      state.totalCount = totalCount;
    },
    [getUserFeed.rejected.type]: (state, error) => {
      console.log(error.payload);
    },
  },
});

export const profileActions = { getUserFeed, ...profile.actions };
export default profile.reducer;
