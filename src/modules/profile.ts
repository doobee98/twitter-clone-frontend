import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UsersApi from 'apis/UsersApi';
import Tweet from 'models/tweet';

const PROFILEPAGE_FEED_INITIAL_COUNT = 10;

const name = 'profile';

interface ProfileState {
  feed: Tweet[];
  totalCount: number;
}

const initialState: ProfileState = { feed: [], totalCount: 0 };

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

export const profile = createSlice({
  name,
  initialState,
  reducers: {
    clearProfileState: () => initialState,
  },
  extraReducers: {
    [getUserFeed.fulfilled.type]: (state, action) => {
      const { totalCount, data: newFeed } = action.payload;
      return {
        feed: [...state.feed, ...newFeed],
        totalCount,
      };
    },
    [getUserFeed.rejected.type]: (state, error) => {
      console.log(error.payload);
      return state;
    },
  },
});

export default profile.reducer;
export const { clearProfileState } = profile.actions;
