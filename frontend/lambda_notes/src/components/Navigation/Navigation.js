import React from "react";
import { Link } from "react-router-dom";
import "../Navigation/Navigation.css";
import AuthService from "../../Auth/authservice";

const Auth = new AuthService();

const Navigation = () => {
  return (
    <div className="NavigationBar">
      {Auth.loggedIn() ? (
        <div>
          <h1 className="Main-Heading">Lambda Notes</h1>
          <p>{`Welcome back, ${Auth.getProfile().username}`}</p>
          <Link to="/home">
            <button className="NavButton">View Your Notes</button>
          </Link>
          <Link to="/create">
            <button className="NavButton">+ Create New Note</button>
          </Link>
          <Link to="/">
            <p onClick={() => Auth.logout()}>Sign Out</p>
          </Link>
        </div>
      ) : (
        <h1 className="Main-Heading">Lambda Notes</h1>
      )}
    </div>
  );
};

export default Navigation;
