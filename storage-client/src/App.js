import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/home';
import Authentication from './components/Authentication/authentication';

// Higher-order component for handling authentication
const ProtectedRoute = ({ component: Component, ...props }) => {
  // Check if the JWT token exists in localStorage
  const isAuthenticated = !!localStorage.getItem('token');
  const [isLoggedOut, setLoggedOut] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  useEffect(() => {
    // Check for inactivity after 20 minutes
    const inactivityTimeout = setTimeout(() => {
      setLoggedOut(true);
    }, 20 * 60 * 1000);

    // Clear the inactivity timeout on user activity
    const resetInactivityTimeout = () => {
      clearTimeout(inactivityTimeout);
      setLoggedOut(false); // Reset the logged out state on user activity
    };

    // Add event listeners for user activity
    document.addEventListener('mousemove', resetInactivityTimeout);
    document.addEventListener('keydown', resetInactivityTimeout);

    // Clean up event listeners on component unmount
    return () => {
      clearTimeout(inactivityTimeout);
      document.removeEventListener('mousemove', resetInactivityTimeout);
      document.removeEventListener('keydown', resetInactivityTimeout);
    };
  }, []);

  const handleLoginClick = () => {
    setRedirectToLogin(true);
  };

  if (!isAuthenticated || isLoggedOut) {
    // Clear the token from localStorage when logged out
    localStorage.removeItem('token');

    if (redirectToLogin) {
      // Redirect to the login page if not authenticated and user has clicked "Log In"
      return <Navigate to="/login" replace />;
    }

    // Show the logged out message and a button to trigger login
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        {isLoggedOut && (
          <div className="bg-red-500 text-white font-bold py-2 px-4 rounded mb-4">
            You have been logged out due to inactivity.
          </div>
        )}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4" onClick={handleLoginClick}>
          Log In
        </button>
      </div>
    );
  }

  return <Component {...props} />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute component={Home} />} />
        <Route path="/login" element={<Authentication />} />
      </Routes>
    </Router>
  );
}

export default App;

