import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../Navigation/Navigation.css";
import AuthService from "../../Auth/authservice";

const Auth = new AuthService();

class Navigation extends Component {
  render() {
    return (
      <div className="NavigationBar">
        <h1 className="Main-Heading">Lambda Notes</h1>
        <Link to="/home">
          <button className="NavButton">View Your Notes</button>
        </Link>
        <Link to="/create">
          <button className="NavButton">+ Create New Note</button>
        </Link>
        {Auth.loggedIn() ? (
          <div>
            <p>{`Welcome back, ${Auth.getProfile().username}`}</p>
            <p onClick={() => Auth.logout()}>Sign Out</p>
          </div>
        ) : (
          <p>Login</p>
        )}
      </div>
    );
  }
}

export default Navigation;
