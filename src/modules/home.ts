import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import TweetsApi from 'apis/TweetsApi';
import Tweet from '../models/tweet';
import { TweetCreateRequest } from '../models/request/tweets';

const HOMEPAGE_FEED_INITIAL_COUNT = 10;

interface HomeState {
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

export const home = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchFeed.fulfilled.type]: (state, action) => {
      const newFeed = action.payload;
      return {
        feed: [...state.feed, ...newFeed],
      };
    },
    [fetchFeed.rejected.type]: (state, error) => {
      console.log(error.payload);
      return state;
    },
    [createTweet.fulfilled.type]: (state, action) => {
      const newTweet = action.payload;
      return {
        feed: [newTweet, ...state.feed],
      };
    },
    [createTweet.rejected.type]: (state, error) => {
      console.log(error.payload);
      return state;
    },
    [deleteTweet.fulfilled.type]: (state, action) => {
      const deletedTweetId = action.payload;
      return {
        feed: state.feed.filter((tweet) => tweet.tweet_id !== deletedTweetId),
      };
    },
    [deleteTweet.rejected.type]: (state, error) => {
      console.log(error.payload);
      return state;
    },
  },
});

export default home.reducer;
