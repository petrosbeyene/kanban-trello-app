// src/app/hooks/useRehydrateAuth.ts
import { useEffect } from 'react';
import { useAppDispatch } from '../app/hooks'; // Adjust the path as necessary
import { loginSuccess } from '../features/auth/authSlice';
// Assuming you have a function to possibly validate the token or fetch user details
import { fetchUserDetails } from '../features/auth/authService';

const useRehydrateAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const rehydrateAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userDetails = await fetchUserDetails(token);
          dispatch(loginSuccess({ token, user: userDetails }));
        } catch (error) {
          console.error("Error rehydrating auth", error);
        }
      }
    };

    rehydrateAuth();
  }, [dispatch]);
};

export default useRehydrateAuth;
