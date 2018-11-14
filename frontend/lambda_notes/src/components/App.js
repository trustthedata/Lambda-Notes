import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import ListView from "./ListView/ListView";
import Navigation from "./Navigation/Navigation";
import NoteView from "./NoteView/NoteView";
import EditNote from "./EditNote/EditNote";
import CreateNoteView from "./CreateNote/CreateNoteView";
import LoginRegister from "./LoginRegister/LoginRegister";
import PrivateRoute from "./PrivateRoute";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <div className="mainViews">
          <Switch>
            <Route exact path="/" component={LoginRegister} />
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
