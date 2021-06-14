import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'modules/auth';
import profileReducer from './profile';
import homeReducer from './home';

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    home: homeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
