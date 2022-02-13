import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import useAuth from './useAuth';

const AuthGuard = ({ children }: { children: JSX.Element }) => {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthGuard;