/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Tweet from 'models/tweet';

interface ModalState {
  isOpenedPostModal: boolean;
  isOpenedReplyModal: boolean;
  isOpenedSignupModal: boolean;
  isOpenedEditModal: boolean;
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
    openPostModal: (state: ModalState, action: PayloadAction) => {
      state.isOpenedPostModal = true;
    },
    closePostModal: (state: ModalState, action: PayloadAction) => {
      state.isOpenedPostModal = false;
    },
    openReplyModal: (state: ModalState, action: PayloadAction<Tweet>) => {
      state.isOpenedReplyModal = true;
      state.originalTweet = action.payload;
    },
    closeReplyModal: (state: ModalState, action: PayloadAction) => {
      state.isOpenedReplyModal = false;
    },
    openSignupModal: (state: ModalState, action: PayloadAction) => {
      state.isOpenedSignupModal = true;
    },
    closeSignupModal: (state: ModalState, action: PayloadAction) => {
      state.isOpenedSignupModal = false;
    },
    openEditModal: (state: ModalState, action: PayloadAction) => {
      state.isOpenedEditModal = true;
    },
    closeEditModal: (state: ModalState, action: PayloadAction) => {
      state.isOpenedEditModal = false;
    },
  },
  extraReducers: {},
});

export const {
  openPostModal,
  closePostModal,
  openReplyModal,
  closeReplyModal,
  openSignupModal,
  closeSignupModal,
  openEditModal,
  closeEditModal,
} = modal.actions;
export default modal.reducer;
