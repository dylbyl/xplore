import { Route, withRouter, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Home from "./home/Home.js";
import Dashboard from "./routes/Dashboard"
//import Login from "./auth/Login";

class ApplicationViews extends Component {
    // Check if credentials are in local storage
    //returns true/false
    isAuthenticated = () => localStorage.getItem("credentials") !== null;
  
    render() {
      return (
        <React.Fragment>
          <Route
            exact
            path="/"
            render={(props) => {
                return <Home />;
            }}
          />
          <Route
            exact
            path="/dash"
            render={(props) => {
                return <Dashboard />;
            }}
          />
        </React.Fragment>
      );
    }
  }
  
  export default ApplicationViews;
  