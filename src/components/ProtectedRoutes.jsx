// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const session = localStorage.getItem("ticketapp_session");
  const location = useLocation();

  if (!session) {
    // redirect to login and pass a message via state
    return (
      <Navigate
        to="/auth/login"
        replace
        state={{ message: "Your session has expired — please log in again.", from: location.pathname }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
