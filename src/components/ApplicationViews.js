import { Route, withRouter, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Home from "./home/Home.js";
import Dashboard from "./routes/Dashboard"
import RouteForm from "./routes/RouteForm"
import RouteDetail from "./routes/RouteDetail"
import RouteEditForm from "./routes/RouteEditForm"
import CommentForm from "./comments/CommentForm"
import Login from "./auth/Login"
import Register from "./auth/Register"
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
                return <Home {...props}/>;
            }}
          />
          <Route
            exact
            path="/dash"
            render={(props) => {
                return <Dashboard {...props}/>;
            }}
          />
          <Route
            exact
            path="/add"
            render={(props) => {
                return <RouteForm {...props}/>;
            }}
          />
          <Route
          exact
          path="/routes/:routeId(\d+)"
          render={(props) => {
              return (
                <RouteDetail routeId={parseInt(props.match.params.routeId)} {...props}/>
              );
          }}
        />
        <Route
        exact
          path="/routes/:routeId(\d+)/comment"
          render={(props) => {
              return (
                <CommentForm routeId={parseInt(props.match.params.routeId)} {...props}/>
              );
          }}
        />
        <Route
        exact
          path="/edit/:routeId(\d+)"
          render={(props) => {
              return (
                <RouteEditForm routeId={parseInt(props.match.params.routeId)} {...props}/>
              );
          }}
        />
        <Route
            exact
            path="/login"
            render={(props) => {
                return <Login {...props}/>;
            }}
          />
          <Route
            exact
            path="/register"
            render={(props) => {
                return <Register {...props}/>;
            }}
          />
        </React.Fragment>
      );
    }
  }
  
  export default ApplicationViews;
  