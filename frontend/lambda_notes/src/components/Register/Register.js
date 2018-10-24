import React, { Component } from "react";
import { SERVER_URL } from "../../Config/config";
import axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: ""
    };
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitInputChange = event => {
    event.preventDefault();
    axios
      .post(`http://localhost:8000/api/users/`, this.state)
      .then(response => {
        localStorage.setItem("jwt", response.data.token);
        this.setState({ username: "", password: "", email: "" });
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
          <label>Email</label>
          <input
            value={this.state.email}
            onChange={this.handleInputChange}
            placeholder="email"
            name="email"
            type="email"
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    );
  }
}

export default Register;
