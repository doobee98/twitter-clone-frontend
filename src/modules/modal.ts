/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  isOpenedPostModal: boolean;
  isOpenedSignupModal: boolean;
}

const initialState: ModalState = {
  isOpenedPostModal: false,
  isOpenedSignupModal: false,
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
    openSignupModal: (state: ModalState, action: PayloadAction) => {
      state.isOpenedSignupModal = true;
    },
    closeSignupModal: (state: ModalState, action: PayloadAction) => {
      state.isOpenedSignupModal = false;
    },
  },
});

export const {
  openPostModal,
  closePostModal,
  openSignupModal,
  closeSignupModal,
} = modal.actions;
export default modal.reducer;
