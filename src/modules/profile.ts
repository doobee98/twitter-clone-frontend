import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UsersApi from 'apis/UsersApi';
import User from '../models/user';

const name = 'profile';

interface ProfileState {
  user?: User;
}

const initialState: ProfileState = {};

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

export const profile = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: {
    [getUser.fulfilled.type]: (state, action) => {
      const user = action.payload;
      return { user };
    },
    [getUser.rejected.type]: (state, error) => {
      console.log(error.payload);
      window.alert(error.payload.msg);
      return state;
    },
  },
});

export default profile.reducer;
