// src/app/hooks/useRehydrateAuth.ts
import { useEffect } from 'react';
import { useAppDispatch } from '../app/hooks';
import { loginSuccess, loginFailure } from '../features/auth/authSlice';
import { fetchUserProfile } from '../features/profile/profileSlice';

const useRehydrateAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // console.log(user)
    const rehydrateAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await dispatch(fetchUserProfile()).unwrap();
          dispatch(loginSuccess({ token }));
        } catch (error) {
          console.error("Error rehydrating auth", error);
          dispatch(loginFailure('Failed to fetch user profile'));
        }
      }
    };

    rehydrateAuth();
  }, [dispatch]);
};

export default useRehydrateAuth;
