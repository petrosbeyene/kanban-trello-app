import axios from 'axios'
import { SigninResponse } from '../../types';
import { User } from '../../types';

const SIGNUP_ENDPOINT = 'http://localhost:8000/api/v1/users/register/';
const SIGNIN_ENDPOINT = 'http://localhost:8000/api/v1/dj-rest-auth/login/';
const USER_DETAILS_ENDPOINT = 'http://localhost:8000/api/v1/dj-rest-auth/user/';
const LOGOUT_ENDPOINT = 'http://localhost:8000/api/v1/dj-rest-auth/logout/';
const PASSWORD_RESET_ENDPOINT = 'http://localhost:8000/api/v1/dj-rest-auth/password/reset/';
const PASSWORD_RESET_CONFIRM_ENDPOINT = 'http://localhost:8000/api/v1/dj-rest-auth/password/reset/confirm/';


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
    await axios.post(SIGNUP_ENDPOINT, payload);
};
  

export const signin = async (payload: SigninPayload): Promise<SigninResponse> => {
    const response = await axios.post(SIGNIN_ENDPOINT, payload);
    return response.data;
};

export const fetchUserDetails = async (token: string): Promise<User> => {
  const response = await axios.get(USER_DETAILS_ENDPOINT, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data;
};

export const logOut = async (): Promise<void> => {
    const token = localStorage.getItem('token');
    if (token) {
        await axios.post(LOGOUT_ENDPOINT, {}, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
    }
}

export const resetPassword = async (email: string): Promise<void> => {
  await axios.post(PASSWORD_RESET_ENDPOINT, { email });
};

// Add to authService.ts
export const handleConfirmPasswordReset = async (uidb64: string, token: string, newPassword1: string, newPassword2: string): Promise<void> => {
  await axios.post(PASSWORD_RESET_CONFIRM_ENDPOINT, {
    uid: uidb64,
    token,
    new_password1: newPassword1,
    new_password2: newPassword2,
  });
};
