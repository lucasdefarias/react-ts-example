import React from 'react';
import './App.css';
import SignIn from './SignIn';
import { Routes, Route, Navigate } from "react-router-dom";
import LoggedApp from './LoggedApp';
import DashboardMain from './LoggedApp/Dashboard';
import Settings from './LoggedApp/Settings';
import AuthGuard from './AuthGuard';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signin" element={<SignIn/>} />
        <Route element={<AuthGuard><LoggedApp/></AuthGuard>}>
          <Route path="/dashboard" element={<DashboardMain/>} />
          <Route path="/settings" element={<Settings/>} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
