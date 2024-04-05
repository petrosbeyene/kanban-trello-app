import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import { signin, fetchUserDetails, logOut } from './authService';
import { User } from '../../types';


interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  user: User | null;
}

const initialState: AuthState = {
  token: null,
  isLoggedIn: false,
  loading: false,
  error: null,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.isLoggedIn = true;
      state.loading = false;
      state.error = null;
      state.token = action.payload.token; // Store the token
      state.user = action.payload.user; // Store the user details
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.token = null; // Ensure token is cleared on failure
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
    }
  },
});

export const {
  loginStart, loginSuccess, loginFailure, logout
} = authSlice.actions;

// Adjust login thunk
export const login = (email: string, password: string): AppThunk => async (dispatch) => {
  dispatch(loginStart());
  try {
    const signinData = await signin({ email, password });
    if (signinData.key) { // Assuming the token is returned under the key property
      const userData = await fetchUserDetails(signinData.key);
      dispatch(loginSuccess({ token: signinData.key, user: userData }));
      localStorage.setItem('token', signinData.key); // Store the token in localStorage
    } else {
      dispatch(loginFailure('No token received'));
    }
  } catch (error: any) {
    dispatch(loginFailure(error.message));
  }
};

// Thunk for logout
export const performLogout = (): AppThunk => async (dispatch) => {
  try {
    await logOut();
    localStorage.removeItem('token');
    dispatch(logout());
    alert("Success!")
  } catch (error: any) {
    console.error("Logout failed", error.message);
    alert(error.message)
  }
};


export default authSlice.reducer;
