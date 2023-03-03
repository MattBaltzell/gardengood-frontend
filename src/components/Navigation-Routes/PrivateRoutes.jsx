import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../../auth/UserContext";

const PrivateRoutes = () => {
  const currUser = useContext(UserContext);

  return currUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
