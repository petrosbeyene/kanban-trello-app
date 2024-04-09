import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hooks'; // Ensure this path is correct

export const ProtectedRoute: React.FC = () => {
  const { isLoggedIn, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return <div>Loading...</div>;
  }
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};
