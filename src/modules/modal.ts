/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Tweet from 'models/tweet';

interface ModalState {
  isOpenedPostModal: boolean;
  isOpenedReplyModal: boolean;
  tweet?: Tweet;
}

const initialState: ModalState = {
  isOpenedPostModal: false,
  isOpenedReplyModal: false,
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
      state.tweet = action.payload;
    },
    closeReplyModal: (state: ModalState, action: PayloadAction) => {
      state.isOpenedReplyModal = false;
    },
  },
  extraReducers: {},
});

export const {
  openPostModal,
  closePostModal,
  openReplyModal,
  closeReplyModal,
} = modal.actions;
export default modal.reducer;
