import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import NotFound from "../../NotFound";
import "./User.css";
import Unauth from "../../Unauth";

const User = () => {
  const { username } = useParams();
  const currUser = useContext(UserContext);

  if (!currUser.username) {
    return <NotFound />;
  }

  return currUser.username !== username ? (
    <Unauth />
  ) : (
    <>
      <main className="User">
        <div className="User__info-container">
          <div className="User__info-header">
            <h1>Account Info</h1>
            <div className="User__info-group">
              <h3>Username</h3>
              <p>{currUser.username}</p>
            </div>
            <div className="User__info-group">
              <h3>Email</h3>
              <p>{currUser.email}</p>
            </div>
            <div className="User__info-group">
              <h3>First Name</h3>
              <p>{currUser.firstName}</p>
            </div>
            <div className="User__info-group">
              <h3>Last Name</h3>
              <p>{currUser.lastName}</p>
            </div>
            <div className="User__info-group">
              <h3>Zip Code</h3>
              <p>{currUser.zipCode}</p>
            </div>

            <Link to={`/users/${currUser.username}/update`}>
              Update account info
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default User;
