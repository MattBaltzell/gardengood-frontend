import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../auth/UserContext";
import { BallTriangle } from "react-loader-spinner";

const PrivateRoutes = ({ isLoading }) => {
  const currUser = useContext(UserContext);

  //This route will be accessed before currUser is available, so we need to check for currUser AFTER isLoading is false.
  return isLoading ? (
    <>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="var(--color-primary-400)"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
      <p className="pulsing">Loading...</p>
    </>
  ) : currUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
