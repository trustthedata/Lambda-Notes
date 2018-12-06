import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Alert
} from "reactstrap";
import "./LoginRegister.css";
import AuthService from "../../Auth/authservice";

const Auth = new AuthService();

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

class LoginRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: {
        username: "",
        password: ""
      },
      register: {
        username: "",
        email: "",
        password: ""
      },
      alerts: {
        login: false,
        register: false,
        emailValidErr: false
      },
      redirect: false,
      type: "login"
    };
  }

  handleUpdateText = formType => event => {
    const { name, value } = event.target;
    const newState = Object.assign({}, this.state);
    newState[formType][name] = value;
    this.setState(newState);
  };

  handleAlerts = type => {
    const newState = Object.assign({}, this.state);
    newState.alerts[type] = !this.state.alerts[type];
    this.setState(newState);
  };

  handleChangeModalType = type => {
    this.setState({
      type: type
    });
  };

  handleRegisterSubmit = event => {
    event.preventDefault();
    const userState = Object.assign({}, this.state["register"]);

    if (
      !this.state.register.email.includes("@") ||
      !this.state.register.email.includes(".")
    ) {
      this.setState({
        alerts: {
          ...this.state.alerts,
          emailValidErr: true
        }
      });
      return;
    } else {
      this.setState({
        alerts: {
          ...this.state.alerts,
          emailValidErr: false
        }
      });
    }

    axios
      .post(`${SERVER_URL}/api/users/`, userState)
      .then(response => {
        localStorage.setItem("jwt", response.data.token);
        this.setState({
          register: {
            username: "",
            email: "",
            password: ""
          },
          redirect: true
        });
      })
      .catch(err => {
        if (!this.state.alerts["register"]) this.handleAlerts("register");
        console.log(err.message);
      });
  };

  handleLoginSubmit = event => {
    event.preventDefault();
    const userState = Object.assign({}, this.state["login"]);

    axios
      .post(`${SERVER_URL}/token-auth/`, userState)
      .then(response => {
        localStorage.setItem("jwt", response.data.token);
        this.setState({
          login: {
            username: "",
            password: ""
          },
          redirect: true
        });
      })
      .catch(err => {
        if (!this.state.alerts["login"]) this.handleAlerts("login");
        console.log(err.message);
      });
  };

  handleRenderFormType = () => {
    if (this.state.redirect) {
      return <Redirect to="/home" />;
    }
    if (this.state.type === "login") {
      return (
        <Card className="login-card">
          <CardHeader className="login-header">
            <p>Login</p>
          </CardHeader>
          <CardBody>
            <form className="login-form">
              <input
                aria-label="Enter username"
                type="text"
                name="username"
                placeholder="Enter your username..."
                value={this.state.login.username}
                className="login-input"
                onChange={this.handleUpdateText("login")}
              />
              <input
                aria-label="Enter Password"
                type="password"
                name="password"
                placeholder="Enter your password..."
                value={this.state.login.password}
                className="login-input"
                onChange={this.handleUpdateText("login")}
              />
              <Button
                type="submit"
                color="primary"
                onClick={this.handleLoginSubmit}
                className="login-button"
              >
                Submit
              </Button>
              <Alert isOpen={this.state.alerts.login} color="danger">
                Incorrect username and/or password, please try again
              </Alert>
            </form>
          </CardBody>
          <CardFooter className="login-footer">
            <p className="login-footer-text">Don't have an account?</p>
            <p
              onClick={() => this.handleChangeModalType("register")}
              className="login-footer-link"
            >
              Click here
            </p>
          </CardFooter>
        </Card>
      );
    }
    if (this.state.type === "register") {
      return (
        <Card className="login-card">
          <CardHeader className="login-header">
            <p>Register</p>
          </CardHeader>
          <CardBody>
            <form className="login-form">
              <input
                aria-label="Enter username"
                type="text"
                name="username"
                placeholder="Enter your username..."
                value={this.state.register.username}
                className="login-input"
                onChange={this.handleUpdateText("register")}
              />
              <input
                aria-label="Enter email"
                type="text"
                name="email"
                placeholder="Enter your email..."
                value={this.state.register.email}
                className="login-input"
                onChange={this.handleUpdateText("register")}
              />
              <input
                aria-label="Enter password"
                type="password"
                name="password"
                placeholder="Enter your password..."
                value={this.state.register.password}
                className="login-input"
                onChange={this.handleUpdateText("register")}
              />
              <Button
                type="submit"
                onClick={this.handleRegisterSubmit}
                color="primary"
                className="login-button"
              >
                Submit
              </Button>
              <Alert isOpen={this.state.alerts.register} color="danger">
                There was an error registering you, please check your
                credentials and try again
              </Alert>
              <Alert isOpen={this.state.alerts.emailValidErr} color="danger">
                Please enter a valid email address
              </Alert>
            </form>
          </CardBody>
          <CardFooter className="login-footer">
            <p className="login-footer-text">Already have an account?</p>
            <p
              onClick={() => this.handleChangeModalType("login")}
              className="login-footer-link"
            >
              Click here
            </p>
          </CardFooter>
        </Card>
      );
    }
  };

  render() {
    return Auth.loggedIn() === true ? (
      <Redirect to="/home" />
    ) : (
      <div>{this.handleRenderFormType()}</div>
    );
  }
}

export default LoginRegister;
