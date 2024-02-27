import { Outlet,Navigate } from "react-router-dom";
import React from "react";
const MentorRoutes = () => {
  const user = JSON.parse(localStorage.getItem("role"));
  return user != null && user ? <Outlet /> :<Navigate to="/login"></Navigate>;
};

export default MentorRoutes;
