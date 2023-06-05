// import logo from './logo.svg';
// import './App.css';
// import Home from './components/home';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Authentication from './components/Authentication/authentication';

// function App() {
//   return (
//     <>
//       <Router>
//         <Routes>
//           <Route path="/home" element={<Home />} />
//           <Route path="/login" element={<Authentication />} />
//           <Route path="/" element={<Authentication />} />
//           {/* Other routes */}
//         </Routes>
//       </Router>
//     </>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/home';
import Authentication from './components/Authentication/authentication';

// Higher-order component for handling authentication
const ProtectedRoute = ({ component: Component, ...props }) => {
  // Check if the JWT token exists in localStorage
  const isAuthenticated = !!localStorage.getItem('token');

  // If the user is authenticated, render the component, otherwise, redirect to the login page
  return isAuthenticated ? <Component {...props} /> : <Navigate to="/login" replace />;
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

