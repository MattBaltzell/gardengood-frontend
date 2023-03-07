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
          <h1>Account Info</h1>

          <div className="User__info-container-section">
            <div className="User__info-group">
              <h4>Username</h4>
              <p>{currUser.username}</p>
            </div>
            <div className="User__info-group">
              <h4>Email</h4>
              <p>{currUser.email}</p>
            </div>
            <div className="User__info-group">
              <h4>First Name</h4>
              <p>{currUser.firstName}</p>
            </div>
            <div className="User__info-group">
              <h4>Last Name</h4>
              <p>{currUser.lastName}</p>
            </div>
            <div className="User__info-group">
              <h4>Zip Code</h4>
              <p>{currUser.zipCode}</p>
            </div>
          </div>

          <Link to={`/users/${currUser.username}/update`}>
            Update account info
          </Link>
        </div>
      </main>
    </>
  );
};

export default User;
