import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/homePage';
import Warehouse from './components/warehouse';
import Authentication from './components/Authentication/authentication';
import AddUnit from './components/addUnitForm';

// Higher-order component for handling authentication
const ProtectedRoute = ({ component: Component, ...props }) => {
  // Check if the JWT token exists in localStorage
  const isAuthenticated = !!localStorage.getItem('token');
  const [isLoggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    let inactivityTimeout;

    const resetInactivityTimeout = () => {
      clearTimeout(inactivityTimeout);
      setLoggedOut(false);
      inactivityTimeout = setTimeout(() => {
        setLoggedOut(true);
      }, 20 * 60 * 1000); // Set the timeout to 10 seconds (10000 milliseconds)
    };

    document.addEventListener('mousemove', resetInactivityTimeout);
    document.addEventListener('keydown', resetInactivityTimeout);

    resetInactivityTimeout();

    return () => {
      clearTimeout(inactivityTimeout);
      document.removeEventListener('mousemove', resetInactivityTimeout);
      document.removeEventListener('keydown', resetInactivityTimeout);
    };
  }, []);

  if (!isAuthenticated || isLoggedOut) {
    localStorage.removeItem('token');

    if (isLoggedOut) {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="bg-red-500 text-white font-bold py-2 px-4 rounded mb-4">
            You have been logged out due to inactivity.
          </div>
          <Navigate to="/login" replace />
        </div>
      );
    }

    return <Navigate to="/login" replace />;
  }

  return <Component {...props} />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute component={HomePage} />} />
        <Route path="/login" element={<Authentication />} />
        <Route path="/warehouse" element={<ProtectedRoute component={Warehouse} />} />
        <Route path="/addunit" element={<ProtectedRoute component={AddUnit} />} />
      </Routes>
    </Router>
  );
}

export default App;
