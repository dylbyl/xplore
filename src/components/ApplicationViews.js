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
    isAuthenticated = () => localStorage.getItem("userId") !== null;
  
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
              if (this.isAuthenticated()) {
                return <Dashboard {...props}/>;
              } else {
                return <Redirect to="/" />
               }
            }}
          />
          <Route
            exact
            path="/add"
            render={(props) => {
              if (this.isAuthenticated()) {
                return <RouteForm {...props}/>;
              } else {
                return <Redirect to="/" />
               }
            }}
          />
          <Route
          exact
          path="/routes/:routeId(\d+)"
          render={(props) => {
            if (this.isAuthenticated()) {
              return (
                <RouteDetail routeId={parseInt(props.match.params.routeId)} {...props}/>
              );
            } else {
              return <Redirect to="/" />
             }
          }}
        />
        <Route
        exact
          path="/routes/:routeId(\d+)/comment"
          render={(props) => {
            if (this.isAuthenticated()) {
              return (
                <CommentForm routeId={parseInt(props.match.params.routeId)} {...props}/>
              );
            } else {
              return <Redirect to="/" />
             }
          }}
        />
        <Route
        exact
          path="/edit/:routeId(\d+)"
          render={(props) => {
            if (this.isAuthenticated()) {
              return (
                <RouteEditForm routeId={parseInt(props.match.params.routeId)} {...props}/>
              );
            } else {
              return <Redirect to="/" />
             }
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
  