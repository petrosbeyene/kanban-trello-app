import axios from 'axios'
import { SigninResponse } from '../../types';
import { User } from '../../types';

const { 
  VITE_SIGNUP_ENDPOINT, VITE_SIGNIN_ENDPOINT, VITE_USER_DETAILS_ENDPOINT,
  VITE_LOGOUT_ENDPOINT, VITE_PASSWORD_RESET_ENDPOINT, VITE_PASSWORD_RESET_CONFIRM_ENDPOINT, VITE_EMAIL_VERIFICATION_BASE_URL
} = import.meta.env;


interface SignupPayload {
  username: string;
  email: string;
  password1: string;
  password2: string;
  first_name: string;
  last_name: string;
}

interface SigninPayload {
    email: string;
    password: string;
}

export const signup = async (payload: SignupPayload): Promise<void> => {
    await axios.post(VITE_SIGNUP_ENDPOINT, payload);
};

export const verifyEmailToken = async (token: string) => {
    const url = `${VITE_EMAIL_VERIFICATION_BASE_URL}account-confirm-email/${token}/`;
    return axios.get(url);
};

export const signin = async (payload: SigninPayload): Promise<SigninResponse> => {
    const response = await axios.post(VITE_SIGNIN_ENDPOINT, payload);
    return response.data;
};

export const fetchUserDetails = async (token: string): Promise<User> => {
  const response = await axios.get(VITE_USER_DETAILS_ENDPOINT, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data;
};

export const logOut = async (): Promise<void> => {
    const token = localStorage.getItem('token');
    if (token) {
        await axios.post(VITE_LOGOUT_ENDPOINT, {}, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
    }
}

export const resetPassword = async (email: string): Promise<void> => {
  await axios.post(VITE_PASSWORD_RESET_ENDPOINT, { email });
};

// Add to authService.ts
export const handleConfirmPasswordReset = async (uidb64: string, token: string, newPassword1: string, newPassword2: string): Promise<void> => {
  await axios.post(VITE_PASSWORD_RESET_CONFIRM_ENDPOINT, {
    uid: uidb64,
    token,
    new_password1: newPassword1,
    new_password2: newPassword2,
  });
};
