/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import TweetsApi from 'apis/TweetsApi';
import UsersApi from 'apis/UsersApi';
import Tweet from '../models/tweet';
import {
  TweetCreateRequest,
  ReplyCreateRequest,
} from '../models/request/tweets';

const FEED_INITIAL_COUNT = 10;

export interface HomeState {
  feed: Tweet[];
  totalCount: number;
}

const initialState: HomeState = {
  feed: [],
  totalCount: 0,
};

const fetchFeed = createAsyncThunk('home/fetchFeed', async (_, thunkAPI) => {
  try {
    const rootState = thunkAPI.getState() as any;
    const { feed } = rootState.home as HomeState;
    const response = await TweetsApi.instance.getFeed(
      feed.length + 1,
      FEED_INITIAL_COUNT,
    );
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const fetchUserFeed = createAsyncThunk(
  'home/fetchUserFeed',
  async (userId: string, thunkAPI) => {
    try {
      const rootState = thunkAPI.getState() as any;
      const { feed } = rootState.home as HomeState;
      const response = await UsersApi.instance.getUserFeed(
        userId,
        feed.length + 1,
        FEED_INITIAL_COUNT,
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

const createTweet = createAsyncThunk(
  'home/createTweet',
  async (tweetCreateRequest: TweetCreateRequest, thunkAPI) => {
    try {
      const { content, image_src_list, reply_permission } = tweetCreateRequest;
      const response = await TweetsApi.instance.createTweet(
        content,
        image_src_list,
        reply_permission,
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

const deleteTweet = createAsyncThunk(
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

const retweetTweet = createAsyncThunk(
  'tweets/retweetTweet',
  async (tweetId: string, thunkAPI) => {
    try {
      await TweetsApi.instance.retweetTweet(tweetId);
      return tweetId;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const unretweetTweet = createAsyncThunk(
  'tweets/unretweetTweet',
  async (tweetId: string, thunkAPI) => {
    try {
      await TweetsApi.instance.unretweetTweet(tweetId);
      return tweetId;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const likeTweet = createAsyncThunk(
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

const dislikeTweet = createAsyncThunk(
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

const replyTweet = createAsyncThunk(
  'home/replyTweet',
  async (replyCreateRequest: ReplyCreateRequest, thunkAPI) => {
    try {
      const { original_tweet_id, content, image_src_list, reply_permission } =
        replyCreateRequest;
      const response = await TweetsApi.instance.replyTweet(
        original_tweet_id,
        content,
        image_src_list,
        reply_permission,
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

export const home = createSlice({
  name: 'home',
  initialState,
  reducers: {
    clearHomeState: () => initialState,
  },
  extraReducers: {
    [fetchFeed.fulfilled.type]: (state, action) => {
      const newFeed = action.payload;
      state.feed = [...state.feed, ...newFeed];
    },
    [fetchFeed.rejected.type]: (state, error) => {
      console.log(error.payload);
    },
    [fetchUserFeed.fulfilled.type]: (state, action) => {
      const { totalCount, data: newFeed } = action.payload;
      return {
        feed: [...state.feed, ...newFeed],
        totalCount,
      };
    },
    [fetchUserFeed.rejected.type]: (state, error) => {
      console.log(error.payload);
      return state;
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
    [retweetTweet.fulfilled.type]: (state, action) => {
      const tweetId = action.payload;
      const tweetIndex = state.feed.findIndex(
        (tweet) => tweet.tweet_id === tweetId,
      );
      if (tweetIndex !== -1) {
        state.feed[tweetIndex].retweet_flag = true;
        state.feed[tweetIndex].retweet_count += 1;
      }
    },
    [retweetTweet.rejected.type]: (state, error) => {
      console.log(error.payload);
      return state;
    },
    [unretweetTweet.fulfilled.type]: (state, action) => {
      const tweetId = action.payload;
      const tweetIndex = state.feed.findIndex(
        (tweet) => tweet.tweet_id === tweetId,
      );
      if (tweetIndex !== -1) {
        state.feed[tweetIndex].retweet_flag = false;
        state.feed[tweetIndex].retweet_count -= 1;
      }
    },
    [unretweetTweet.rejected.type]: (state, error) => {
      console.log(error.payload);
      return state;
    },
    [likeTweet.fulfilled.type]: (state, action) => {
      const tweetId = action.payload;
      const tweetIndex = state.feed.findIndex(
        (tweet) => tweet.tweet_id === tweetId,
      );
      if (tweetIndex !== -1) {
        state.feed[tweetIndex].like_flag = true;
        state.feed[tweetIndex].like_count += 1;
      }
    },
    [likeTweet.rejected.type]: (state, error) => {
      console.log(error.payload);
    },
    [dislikeTweet.fulfilled.type]: (state, action) => {
      const tweetId = action.payload;
      const tweetIndex = state.feed.findIndex(
        (tweet) => tweet.tweet_id === tweetId,
      );
      if (tweetIndex !== -1) {
        state.feed[tweetIndex].like_flag = false;
        state.feed[tweetIndex].like_count -= 1;
      }
    },
    [dislikeTweet.rejected.type]: (state, error) => {
      console.log(error.payload);
    },
    // TODO: reply can be changed
    [replyTweet.fulfilled.type]: (state, action) => {
      const newReplyTweet = action.payload;
      const tweetIndex = state.feed.findIndex(
        (tweet) => tweet.tweet_id === newReplyTweet.reply_id,
      );
      if (tweetIndex !== -1) {
        state.feed[tweetIndex].reply_count += 1;
      }
      state.feed = [newReplyTweet, ...state.feed];
    },
    [replyTweet.rejected.type]: (state, error) => {
      console.log(error.payload);
      return state;
    },
  },
});

export const homeActions = {
  fetchFeed,
  fetchUserFeed,
  createTweet,
  deleteTweet,
  retweetTweet,
  unretweetTweet,
  likeTweet,
  dislikeTweet,
  replyTweet,
  ...home.actions,
};
export default home.reducer;
