import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const MenteeRoutes = () => {
  const user = JSON.parse(localStorage.getItem("role"));
  return user != null && !user ? <Outlet /> : <Navigate to="/login"></Navigate>;
};

export default MenteeRoutes;
