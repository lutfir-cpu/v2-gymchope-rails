import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const PrivateRoutes = ({ children, status, checkStatus }) => {
  
  useEffect(() => {
    checkStatus();
  }, [])
  
  if (status == "NOT_LOGGED_IN") {
    return <Navigate to="/"/>
  }
  return children;
}

export default PrivateRoutes;