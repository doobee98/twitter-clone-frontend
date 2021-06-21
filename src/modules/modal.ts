/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Tweet from 'models/tweet';
import User from 'models/user';

export interface ModalState {
  isOpenedPostModal: boolean;
  isOpenedReplyModal: boolean;
  isOpenedSignupModal: boolean;
  isOpenedEditModal: boolean;
  profileOwner?: User;
  originalTweet?: Tweet;
}

const initialState: ModalState = {
  isOpenedPostModal: false,
  isOpenedReplyModal: false,
  isOpenedSignupModal: false,
  isOpenedEditModal: false,
};

export const modal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openPostModal: (state: ModalState) => {
      state.isOpenedPostModal = true;
    },
    closePostModal: (state: ModalState) => {
      state.isOpenedPostModal = false;
    },
    openReplyModal: (state: ModalState, action: PayloadAction<Tweet>) => {
      state.isOpenedReplyModal = true;
      state.originalTweet = action.payload;
    },
    closeReplyModal: (state: ModalState) => {
      state.isOpenedReplyModal = false;
    },
    openSignupModal: (state: ModalState) => {
      state.isOpenedSignupModal = true;
    },
    closeSignupModal: (state: ModalState) => {
      state.isOpenedSignupModal = false;
    },
    openEditModal: (state: ModalState, action: PayloadAction<User>) => {
      state.isOpenedEditModal = true;
      state.profileOwner = action.payload;
    },
    closeEditModal: (state: ModalState) => {
      state.isOpenedEditModal = false;
    },
  },
  extraReducers: {},
});

export const modalActions = modal.actions;
export default modal.reducer;
