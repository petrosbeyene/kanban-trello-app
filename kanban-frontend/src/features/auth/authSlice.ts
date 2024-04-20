import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import { signup, signin, logOut, resetPassword, handleConfirmPasswordReset, verifyEmailToken } from './authService';
import { SignupFormValues } from '../../types';


interface AuthState {
  signupStatus: 'idle' | 'loading' | 'success' | 'failure';
  emailVerificationStatus: 'idle' | 'loading' | 'success' | 'failure';
  accessToken: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  passwordResetStatus: 'idle' | 'loading' | 'success' | 'failure';
}

const initialState: AuthState = {
  signupStatus: 'idle',
  emailVerificationStatus: 'idle',
  accessToken: null,
  isLoggedIn: false,
  loading: true,
  error: null,
  passwordResetStatus: 'idle',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signupStart: (state) => {
      state.signupStatus = 'loading';
    },
    signupSuccess: (state) => {
      state.signupStatus = 'success';
    },
    signupFailure: (state) => {
      state.signupStatus = 'failure';
    },
    emailVerificationStart: (state) => {
      state.emailVerificationStatus = 'loading';
    },
    emailVerificationSuccess: (state) => {
      state.emailVerificationStatus = 'success';
    },
    emailVerificationFailure: (state) => {
      state.emailVerificationStatus = 'failure';
    },
    loginSuccess: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.isLoggedIn = true;
      state.loading = false;
      state.error = null;
      state.accessToken = action.payload.accessToken;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.accessToken = null;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.accessToken = null;
    },
    passwordResetStart: (state) => {
      state.passwordResetStatus = 'loading';
    },
    passwordResetSuccess: (state) => {
      state.passwordResetStatus = 'success';
    },
    passwordResetFailure: (state, action: PayloadAction<string>) => {
      state.passwordResetStatus = 'failure';
      state.error = action.payload;
    },
    resetPasswordResetStatus: (state) => {
      state.passwordResetStatus = 'idle';
      state.error = null;
    },
    confirmPasswordResetStart: (state) => {
      state.loading = true;
    },
    confirmPasswordResetSuccess: (state) => {
      state.loading = false;
    },
    confirmPasswordResetFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  signupStart, signupSuccess, signupFailure,
  emailVerificationStart, emailVerificationSuccess, emailVerificationFailure, loginSuccess, loginFailure, logout,
  passwordResetStart, passwordResetSuccess, passwordResetFailure, resetPasswordResetStatus,
  confirmPasswordResetStart, confirmPasswordResetFailure, confirmPasswordResetSuccess
} = authSlice.actions;

// Thunk for signup
export const performSignup = (signupData: SignupFormValues): AppThunk => async (dispatch) => {
  dispatch(signupStart());
  try {
    await signup(signupData);
    dispatch(signupSuccess());
  } catch (error: any) {
    dispatch(signupFailure());
    console.error('Signup error:', error.message);
    throw error;
  }
};

// Thunk for email verification
export const verifyEmail = (token: string): AppThunk => async (dispatch) => {
  dispatch(emailVerificationStart());
  try {
    await verifyEmailToken(token);
    dispatch(emailVerificationSuccess());
  } catch (error: any) {
    dispatch(emailVerificationFailure());
    console.error('There was an error verifying the email:', error);
  }
};

// Adjust login thunk
export const login = (email: string, password: string): AppThunk => async (dispatch) => {
  try {
    const signinData = await signin({ email, password });
    if (signinData.access) {
      dispatch(loginSuccess({ accessToken: signinData.access }));
      localStorage.setItem('accessToken', signinData.access);
    } else {
      dispatch(loginFailure('No token received'));
    }
  } catch (error: any) {
    dispatch(loginFailure(error.message));
    alert(error.message)
  }
};

// Thunk for logout
export const performLogout = (): AppThunk => async (dispatch) => {
  try {
    await logOut();
    dispatch(logout());
    alert("Success!")
  } catch (error: any) {
    console.error("Logout failed", error.message);
    alert(error.message)
  }
};

export const requestPasswordReset = (email: string): AppThunk => async (dispatch) => {
  dispatch(passwordResetStart());
  try {
    await resetPassword(email);
    dispatch(passwordResetSuccess());
    alert("If an account with the provided email exists, you will receive a password reset email shortly.");
  } catch (error: any) {
    dispatch(passwordResetFailure(error.toString()));
    alert(error.message);
  }
};


export const confirmPasswordReset = (uidb64: string, token: string, newPassword1: string, newPassword2: string): AppThunk => async (dispatch) => {
  dispatch(confirmPasswordResetStart());
  try {
    await handleConfirmPasswordReset(uidb64, token, newPassword1, newPassword2);
    dispatch(confirmPasswordResetSuccess());
    alert("Success!")
  } catch (error: any) {
    dispatch(confirmPasswordResetFailure(error.toString()));
    alert(error.toString())
  }
};

export default authSlice.reducer;
