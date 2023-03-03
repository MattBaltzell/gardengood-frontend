import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../../auth/UserContext";

const PrivateRoutes = () => {
  const currUser = useContext(UserContext);

  return !currUser ? <Navigate to="/login" /> : <Outlet />;
};

export default PrivateRoutes;
