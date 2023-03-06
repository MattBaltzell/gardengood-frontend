import React, { useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import { BallTriangle } from "react-loader-spinner";
import NotFound from "../../NotFound";
import "./User.css";
import UpdateUserForm from "./UpdateUserForm";

const User = () => {
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const currUser = useContext(UserContext);

  if (!currUser.username) {
    return <NotFound />;
  }

  return currUser.username !== username ? (
    <>Nope</>
  ) : (
    <>
      <main className="User">
        <div className="User__info-container">
          <div className="User__info-header">
            <h1>
              {currUser.username[0].toUpperCase() + currUser.username.slice(1)}
              's Profile
            </h1>

            <h3>Email</h3>
            <p>{currUser.email}</p>
            <h3>First Name</h3>
            <p>{currUser.firstName}</p>
            <h3>Last Name</h3>
            <p>{currUser.lastName}</p>
            <h3>Zip Code</h3>
            <p>{currUser.email}</p>

            <Link to={`/users/update`}>Update account info</Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default User;
