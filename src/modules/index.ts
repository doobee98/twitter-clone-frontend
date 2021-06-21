import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'modules/auth';
import modalReducer from './modal';
import homeReducer from './home';
import userRecordReducer from './userRecord';

const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
    userRecord: userRecordReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
export default store;
