import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { SERVER_URL } from "../../Config/config";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Alert
} from "reactstrap";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submitInputChange = event => {
    event.preventDefault();
    axios
      .post(`http://localhost:8000/token-auth/`, this.state)
      .then(response => {
        localStorage.setItem("jwt", response.data.token);
        this.setState({ username: "", password: "" });
        this.props.history.push("/home");
      })
      .catch(err => err.message);
  };

  render() {
    return (
      <form onSubmit={this.submitInputChange}>
        <div>
          <label>Username</label>
          <input
            value={this.state.username}
            onChange={this.handleInputChange}
            placeholder="username"
            name="username"
            type="text"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            value={this.state.password}
            onChange={this.handleInputChange}
            placeholder="password"
            name="password"
            type="password"
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    );
  }
}

export default Login;
