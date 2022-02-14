import React from 'react';
import './App.css';
import SignIn from './SignIn';
import { Routes, Route, Navigate } from "react-router-dom";
import LoggedApp from './LoggedApp';
import DashboardMain from './LoggedApp/Dashboard';
import Settings from './LoggedApp/Settings';
import AuthGuard from './AuthGuard';
import { AuthProvider } from './useAuth';



function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/signin" element={<SignIn/>} />
          <Route element={<AuthGuard><LoggedApp/></AuthGuard>}>
            <Route path="/dashboard" element={<DashboardMain/>} />
            <Route path="/settings" element={<Settings/>} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
