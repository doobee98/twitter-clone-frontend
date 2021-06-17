import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'modules/auth';
import modalReducer from 'modules/modal';

const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
