import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store'
import { signin } from './authService';

interface AuthState {
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state) => {
      state.isLoggedIn = true;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

// Thunk for login
export const login = (email: string, password: string): AppThunk => async (dispatch) => {
  try {
    dispatch(loginStart());
    await signin({ email, password }); // Implement this function based on your API
    dispatch(loginSuccess());
  } catch (error: any) {
    dispatch(loginFailure(error.message));
  }
};

export default authSlice.reducer;
