import axios from 'axios'
import { SigninResponse } from '../../types';
import { User } from '../../types';

const SIGNUP_ENDPOINT = 'http://localhost:8000/api/v1/users/register/';
const SIGNIN_ENDPOINT = 'http://localhost:8000/api/v1/dj-rest-auth/login/';
const USER_DETAILS_ENDPOINT = 'http://localhost:8000/api/v1/dj-rest-auth/user/';
const LOGOUT_ENDPOINT = 'http://localhost:8000/api/v1/dj-rest-auth/logout/';


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
      Authorization: `Token ${token}`, // Adjust this according to how your backend expects the token
    },
  });
  return response.data; // Return the user data
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