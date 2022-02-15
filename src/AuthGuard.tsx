import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const loggedUser = useSelector(
    (state: RootState) => state.user.loggedUser
  );  
  const location = useLocation();

  if (!loggedUser?.email) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthGuard;