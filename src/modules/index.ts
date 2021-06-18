import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'modules/auth';
import modalReducer from 'modules/modal';
import homeReducer from './home';

const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
