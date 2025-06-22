import React, { useEffect, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom';

// Option 1: Using React.PropsWithChildren
const ProtectedRoute: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // Log to confirm rendering
  console.log("ProtectedRoute rendered");
  // Debugger for development

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
