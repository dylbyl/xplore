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
      width: 1900,
      height: 550,
      latitude: 38.5245,
      longitude: -82.6202,
      zoom: 10,
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
    <ReactMapGL
      className="route-detail-map"
      {...this.state.viewport}
      mapboxApiAccessToken={
        "pk.eyJ1IjoiZHlsYnlsIiwiYSI6ImNrYmh6M2M0YTBhNmcycm04bzF0MGVxNGMifQ.zH776ZxDF0GCyvco-a2WiQ"
      }
      onViewportChange={(viewport) => this.setState({ viewport })}
      mapStyle='mapbox://styles/mapbox/satellite-v9'
    >
      {this.state.routes.map((route) => {
        return <Marker
        longitude={route.longitude - 0.0001}
        latitude={route.latitude + 0.0001}
      >
        <b className="map-text">{route.routeName}
        <br /></b>
        <Pin size={20} />
      </Marker>

      })}
      
    </ReactMapGL>
    <section className="home-content">
      <section className="home-card">
        <h2 className="home-header-large">Welcome to xplore!</h2>
        <br />
        {this.checkLogoutButton()}
      </section>
    </section>
    </>
    );
  }
}

export default Home;