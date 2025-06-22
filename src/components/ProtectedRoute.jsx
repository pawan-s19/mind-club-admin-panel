import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // Log to confirm rendering
  console.log("ProtectedRoute rendered");
  // Debugger for development
  debugger;

  useEffect(() => {
    if (!token) {
      console.log("No token found");
      navigate("/signin");
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return (
    <>{children}</>
  )
}

export default ProtectedRoute
