// src/app/hooks/useRehydrateAuth.ts
import { useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import { loginSuccess } from '../features/auth/authSlice';
import { fetchUserProfile } from '../features/profile/profileSlice';

const useRehydrateAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // console.log(user)
    const rehydrateAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          dispatch(fetchUserProfile());
          dispatch(loginSuccess({ token }));
        } catch (error) {
          console.error("Error rehydrating auth", error);
        }
      }
    };

    rehydrateAuth();
  }, [dispatch]);
};

export default useRehydrateAuth;
