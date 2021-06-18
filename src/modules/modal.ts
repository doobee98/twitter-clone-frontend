/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ModalState {
  isOpenedPostModal: boolean;
}

const initialState: ModalState = {
  isOpenedPostModal: false,
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
  },
});

export const { openPostModal, closePostModal } = modal.actions;
export default modal.reducer;
