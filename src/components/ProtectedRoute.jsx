import { Navigate } from "react-router-dom";

// Checks if user is logged in (exists in localStorage)
export default function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");
  
  if (!user) {
    // If no user found, redirect to login
    return <Navigate to="/login" replace />;
  }

  return children;
}