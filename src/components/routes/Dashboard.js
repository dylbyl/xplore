import React, { Component } from "react";
//import the components we will need
import RouteCard from "./RouteCard";
import "./Dashboard.css";
import RouteManager from "../../modules/RouteManager.js";
import RouteSelect from "./RouteSelect";
import ReactMapGL, { Marker } from "react-map-gl";
import Pin from "./Pin.js";

class TaskList extends Component {
  //define what this component needs to render

  state = {
    routes: [],
    tags: [],
    tagId: "undefined",
    loadingStatus: true,
    viewport: {
      width: 400,
      height: 600,
      latitude: 36,
      longitude: -92,
      zoom: 10,
    },
    marker: {
      longitude: null,
      latitude: null,
    }
  };

  handleFilterChange = (evt) => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((pos) => {
      const viewport = {
        ...this.state.viewport,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      }
      this.setState({ viewport })
    })

    RouteManager.getAllWithInfo().then((routes) => {
      this.setState({
        routes: routes,
      });
      RouteManager.getAllTags().then((tags) => {
        this.setState({
          tags: tags,
          loadingStatus: false,
        });
      });
    });
  }

  render() {
    let filteredRoutes = "";

    if (this.state.tagId === "undefined") {
      filteredRoutes = this.state.routes;
    } else {
      filteredRoutes = this.state.routes.filter(
        (route) => route.tag.id === parseInt(this.state.tagId)
      );
    }

    let sortedRoutes = filteredRoutes.sort((a, b) =>
      a.date > b.date ? -1 : 1
    );

    return (
      <>
        <h2 className="route-header">Dashboard</h2>
        <section className="dashboard-content">
          <section className="btn-container">
            <button
              type="button"
              disabled={this.loadingStatus}
              className="dash-btn"
              onClick={() => {
                this.props.history.push("/add");
              }}
            >
              Add Route
            </button>
            <select name="tagId" id="tagId" onChange={this.handleFilterChange}>
              <option value="undefined">--Select a tag to filter--</option>
              <option value="undefined">View all</option>
              {this.state.tags.map((tagFromState) => (
                <RouteSelect selectProp={tagFromState} key={tagFromState.id} />
              ))}
            </select>
          </section>
          <div className="route-card-container">
            {sortedRoutes.map((route) => (
              <RouteCard key={route.id} routeProp={route} {...this.props} />
            ))}
          </div>
        <section className="map-container">
          <h4 className="home-header-large">Routes Near You:</h4>
          <h5 className="home-header-large">Click a route name to view its listing</h5>
        <ReactMapGL
              className="route-detail-map"
              {...this.state.viewport}
              mapboxApiAccessToken={
                "pk.eyJ1IjoiZHlsYnlsIiwiYSI6ImNrYmh6M2M0YTBhNmcycm04bzF0MGVxNGMifQ.zH776ZxDF0GCyvco-a2WiQ"
              }
              onViewportChange={(viewport) => this.setState({ viewport })}
              mapStyle='mapbox://styles/mapbox/streets-v11'
            >
              {sortedRoutes.map((route) => {
                if(this.state.viewport.longitude - route.longitude <= .1 && 
                  this.state.viewport.longitude - route.longitude >= -.1 &&
                  this.state.viewport.latitude - route.latitude <= .1 &&
                  this.state.viewport.latitude - route.latitude >= -.1
                  ){
                return (
                  <Marker
                    longitude={route.longitude - 0.0001}
                    latitude={route.latitude + 0.0001}
                  >
                    <b onClick={() => {
                      this.props.history.push(`/routes/${route.id}`);
                    }}>{route.routeName}</b>
                    <br/>
                    <Pin size={20} />
                  </Marker>
                );
                  } else {
                    return <></>
                  }
              })}
            </ReactMapGL>
        </section>
        </section>
      </>
    );
  }
}

export default TaskList;
