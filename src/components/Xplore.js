import React, { Component } from "react";
import NavBar from './nav-bar/NavBar'
import ApplicationViews from './ApplicationViews'

class Library extends Component {
  render() {
    return (
      <>
        <NavBar />
        <ApplicationViews />
      </>
    );
  }
}

export default Library;