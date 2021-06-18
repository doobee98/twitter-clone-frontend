import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'modules/auth';
import profileReducer from './profile';
import modalReducer from './modal';
import homeReducer from './home';
import userRecordReducer from './userRecord';

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    home: homeReducer,
    userRecord: userRecordReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
