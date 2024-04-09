import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import projectReducer from '../features/projects/projectSlice';
import profileReducer from '../features/profile/profileSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


// Define the AppThunk type
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
