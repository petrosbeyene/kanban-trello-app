import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

export const ProtectedRoute: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const token = localStorage.getItem('token'); // or sessionStorage based on where you store it

  return isLoggedIn && token ? <Outlet /> : <Navigate to="/login" />;
};
