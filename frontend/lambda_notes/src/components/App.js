import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ListView from "./ListView/ListView";
import Navigation from "./Navigation/Navigation";
import NoteView from "./NoteView/NoteView";
import EditNote from "./EditNote/EditNote";
import CreateNoteView from "./CreateNote/CreateNoteView";
import Register from "./Register/Register";
import Login from "./Login/Login";
import "./App.css";
import AuthService from "../Auth/authservice";

const Auth = new AuthService();

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.loggedIn() === true ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <div className="mainViews">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/home" component={ListView} />
            <PrivateRoute exact path="/note/:id" component={NoteView} />
            <PrivateRoute exact path="/create" component={CreateNoteView} />
            <PrivateRoute exact path="/edit/:id" component={EditNote} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
