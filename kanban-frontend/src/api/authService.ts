import axios from 'axios'

const SIGNUP_ENDPOINT = 'http://localhost:8000/api/v1/users/register/';
const SIGNIN_ENDPOINT = 'http://localhost:8000/api/v1/auth/signin/';


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
  
export const signin = async (payload: SigninPayload): Promise<void> => {
    await axios.post(SIGNIN_ENDPOINT, payload);
};
