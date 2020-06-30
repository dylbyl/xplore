import React, { Component } from "react";
import "./Home.css"
import RouteManager from "../../modules/RouteManager.js";
import ReactMapGL, { Marker } from "react-map-gl";
import Pin from "../routes/Pin.js";

class Home extends Component {

  state = {
    routes: [],
    loadingStatus: true,
    viewport: {
      width: 450,
      height: 450,
      latitude: 36,
      longitude: -92,
      zoom: 2,
    },
    marker: {
      longitude: null,
      latitude: null,
    }
  }

  logoutUser = () => {
    localStorage.clear("userId");
    this.props.history.push("/");
  };

  isAuthenticated = () => localStorage.getItem("userId") !== null;

  checkLogoutButton = () => {
    if (this.isAuthenticated()) {
      return (
        <button
        className="home-btn"
          type="button"
          onClick={() => {
            this.logoutUser();
          }}
        >
          Logout
        </button>
      );
    } else {
      return (
        <>
          <button
          className="home-btn"
            type="button"
            onClick={() => {
              this.props.history.push("/login");
            }}
          >
            Login
          </button>
          <button
          className="home-btn"
            type="button"
            onClick={() => {
              this.props.history.push("/register");
            }}
          >
            Register
          </button>
        </>
      );
    }
  };

  componentDidMount() {
    //getAll from TaskManager and hang on to that data; put it in state
    RouteManager.getAllWithInfo().then((routes) => {
      this.setState({
        routes: routes,
        loadingStatus: false
        });
  })
}

  render() {
    return (
      <>
      <section className="home-content">
      <section className="home-card">
        <h2 className="home-header-large">Welcome to xplore!</h2>
        <br />
        {this.checkLogoutButton()}
      </section>
      <section className="map-section">
      <h4 className="home-header-large">Look at all of our routes!</h4>
      <ReactMapGL
      className="route-detail-map"
      {...this.state.viewport}
      mapboxApiAccessToken={
        "pk.eyJ1IjoiZHlsYnlsIiwiYSI6ImNrYmh6M2M0YTBhNmcycm04bzF0MGVxNGMifQ.zH776ZxDF0GCyvco-a2WiQ"
      }
      onViewportChange={(viewport) => this.setState({ viewport })}
    >
      {this.state.routes.map((route) => {
        return <Marker
        longitude={route.longitude - 0.0001}
        latitude={route.latitude + 0.0001}
      >
        <Pin size={20} />
      </Marker>

      })}
      
    </ReactMapGL>
    </section>
    </section>
    </>
    );
  }
}

export default Home;