import axios from 'axios';
import { User, userUpdateFormValues } from '../../types';

const {VITE_USER_DETAILS_ENDPOINT} = import.meta.env;


export const fetchUserDetails = async (token: string): Promise<User> => {
    try{
        const response = await axios.get(VITE_USER_DETAILS_ENDPOINT, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error
    }
};

export const updateUserDetails = async (token: string, profileData: userUpdateFormValues) => {
    try {
      const response = await axios.put(VITE_USER_DETAILS_ENDPOINT, profileData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

