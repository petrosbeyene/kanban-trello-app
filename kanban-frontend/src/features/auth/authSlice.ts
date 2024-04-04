import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import { signin, signup } from './authService'; // Assuming signup is implemented similarly to signin

interface AuthState {
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  signupLoading: boolean;
  signupError: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  loading: false,
  error: null,
  signupLoading: false,
  signupError: null,
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
    signupStart: (state) => {
      state.signupLoading = true;
    },
    signupSuccess: (state) => {
      state.signupLoading = false;
      state.signupError = null;
    },
    signupFailure: (state, action: PayloadAction<string>) => {
      state.signupLoading = false;
      state.signupError = action.payload;
    },
  },
});

export const {
  loginStart, loginSuccess, loginFailure, logout,
  signupStart, signupSuccess, signupFailure
} = authSlice.actions;

// Thunk for login
export const login = (email: string, password: string): AppThunk => async (dispatch) => {
  try {
    dispatch(loginStart());
    await signin({ email, password }); // Implement this function based on your API
    dispatch(loginSuccess());
  } catch (error: any) {
    dispatch(loginFailure(error.message));
    alert(error.message)
  }
};

// Thunk for signup with callback
export const register = (userData: any, onSuccess: () => void): AppThunk => async (dispatch) => {
  dispatch(signupStart());
  try {
    await signup(userData); // Your signup service call
    dispatch(signupSuccess());
    onSuccess(); // Call the onSuccess callback if signup is successful
  } catch (error: any) {
    dispatch(signupFailure(error.message));
    alert(error.message)
  }
};

export default authSlice.reducer;
