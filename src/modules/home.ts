/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import TweetsApi from 'apis/TweetsApi';
import Tweet from '../models/tweet';
import { TweetCreateRequest } from '../models/request/tweets';

const HOMEPAGE_FEED_INITIAL_COUNT = 10;

export interface HomeState {
  feed: Tweet[];
}

const initialState: HomeState = {
  feed: [],
};

export const fetchFeed = createAsyncThunk(
  'home/fetchFeed',
  async (_, thunkAPI) => {
    try {
      const rootState = thunkAPI.getState() as any;
      const { feed } = rootState.home as HomeState;
      const response = await TweetsApi.instance.getFeed(
        feed.length + 1,
        HOMEPAGE_FEED_INITIAL_COUNT,
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

export const createTweet = createAsyncThunk(
  'home/createTweet',
  async (tweetCreateRequest: TweetCreateRequest, thunkAPI) => {
    try {
      const { content, image_src_list } = tweetCreateRequest;
      const response = await TweetsApi.instance.createTweet(
        content,
        image_src_list,
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

export const deleteTweet = createAsyncThunk(
  'tweets/deleteTweet',
  async (tweetId: string, thunkAPI) => {
    try {
      await TweetsApi.instance.deleteTweet(tweetId);
      return tweetId;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const likeTweet = createAsyncThunk(
  'tweets/likeTweet',
  async (tweetId: string, thunkAPI) => {
    try {
      await TweetsApi.instance.likeTweet(tweetId);
      return tweetId;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const dislikeTweet = createAsyncThunk(
  'tweets/dislikeTweet',
  async (tweetId: string, thunkAPI) => {
    try {
      await TweetsApi.instance.dislikeTweet(tweetId);
      return tweetId;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const home = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchFeed.fulfilled.type]: (state, action) => {
      const newFeed = action.payload;
      state.feed = [...state.feed, ...newFeed];
    },
    [fetchFeed.rejected.type]: (state, error) => {
      console.log(error.payload);
    },
    [createTweet.fulfilled.type]: (state, action) => {
      const newTweet = action.payload;
      state.feed = [newTweet, ...state.feed];
    },
    [createTweet.rejected.type]: (state, error) => {
      console.log(error.payload);
    },
    [deleteTweet.fulfilled.type]: (state, action) => {
      const deletedTweetId = action.payload;
      state.feed = state.feed.filter(
        (tweet) => tweet.tweet_id !== deletedTweetId,
      );
    },
    [deleteTweet.rejected.type]: (state, error) => {
      console.log(error.payload);
    },
    [likeTweet.fulfilled.type]: (state, action) => {
      const tweetId = action.payload;
      const tweetIndex = state.feed.findIndex(
        (tweet) => tweet.tweet_id === tweetId,
      );
      state.feed[tweetIndex].like_flag = true;
    },
    [likeTweet.rejected.type]: (state, error) => {
      console.log(error.payload);
    },
    [dislikeTweet.fulfilled.type]: (state, action) => {
      const tweetId = action.payload;
      const tweetIndex = state.feed.findIndex(
        (tweet) => tweet.tweet_id === tweetId,
      );
      state.feed[tweetIndex].like_flag = false;
    },
    [dislikeTweet.rejected.type]: (state, error) => {
      console.log(error.payload);
    },
  },
});

export default home.reducer;
