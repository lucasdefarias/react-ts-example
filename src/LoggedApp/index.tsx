import React from 'react';
import { Outlet } from 'react-router';

const LoggedApp = () => {
  return (
    <div>
      Dashboard layout
      <Outlet/>
    </div>
  );
};

export default LoggedApp;