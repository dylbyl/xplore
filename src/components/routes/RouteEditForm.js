import React, { Component } from "react";
import RouteManager from "../../modules/RouteManager";
import RouteSelect from "./RouteSelect"
import "./RouteForm.css"
import ReactMapGL, { Marker } from "react-map-gl";
import Pin from "./Pin.js";
import MapboxManager from "../../modules/MapboxManager"


class TaskEditForm extends Component {
  //set the initial state
  state = {
    id: "",
    address: "",
    routeName: "",
    routeLength: "",
    directions: "",
    tagId: undefined,
    tags: [],
    date: new Date(),
    loadingStatus: true,
    viewport: {
      width: 400,
      height: 400,
      latitude: 38.4192,
      longitude: -82.4452,
      zoom: 12,
    },
    marker: {
      longitude: null,
      latitude: null,
    },
  };

  handleFieldChange = (evt) => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  handleMapClick = (ev) => {
    const lng = ev.lngLat[0];
    const lat = ev.lngLat[1];
    const marker = {
      ...this.state.marker,
      longitude: lng,
      latitude: lat,
    };
    this.setState({ marker })
   }

  updateExistingRoute = (evt) => {
    evt.preventDefault();
    if (
        this.state.routeName === "" ||
        this.state.routeLength === "" ||
        this.state.directions === "" ||
        this.state.marker.longitude == null ||
        this.state.tagId === undefined
      ) {
        window.alert("Please input something in all fields");
      } else {
        MapboxManager.getAddress(this.state.marker.longitude, this.state.marker.latitude)
      .then((results) => {

        let addressName = results.features[0]["place_name"]
        this.setState({ loadingStatus: true });
        const route = {
            id: this.state.id,
          userId: 1,
          address: addressName,
          routeName: this.state.routeName,
          routeLength: this.state.routeLength,
          directions: this.state.directions,
          tagId: this.state.tagId,
          longitude: this.state.marker.longitude,
          latitude: this.state.marker.latitude,
          date: this.state.date
        };

      // Create the task and redirect user to task list
      RouteManager.update(route).then(() => this.props.history.push("/dash"));
      })
    }
  };

  componentDidMount() {
    RouteManager.getSingleWithInfo(this.props.routeId).then((route) => {
        this.setState({
            id: route.id,
            routeName: route.routeName,
            address: route.address,
            username: route.user.username,
            routeLength: route.routeLength,
            tagId: route.tag.id,
            directions: route.directions,
            date: route.date,
            loadingStatus: false,
            viewport: {
              width: 400,
              height: 400,
              latitude: route.latitude,
              longitude: route.longitude,
              zoom: 16,
            },
            marker: {
              longitude: route.longitude,
              latitude: route.latitude,
            },
        });

        RouteManager.getAllTags().then((tags) => {
            this.setState({
              tags: tags,
              loadingStatus: false,
              });
            });
    })
  }

  render() {
    return (
        <>
          <div className="route-center">
            <form>
              <fieldset>
                <div className="route-form">
                  <h3 className="route-header">Add a New Route</h3>
                  <label htmlFor="routeName">Route Name</label>
                  <input
                    type="text"
                    required
                    value={this.state.routeName}
                    onChange={this.handleFieldChange}
                    id="routeName"
                    placeholder="Description of route"
                  />
                  <br />
                  <label htmlFor="tagId">Point of Route</label>
                  <select
                    name="tagId"
                    id="tagId"
                    onChange={this.handleFieldChange}
                    value={this.state.tagId}
                  >
                    <option value="undefined">--Select--</option>
                    {this.state.tags.map((tagFromState) => (
                      <RouteSelect selectProp={tagFromState} key={tagFromState.id} />
                    ))}
                  </select>
                  <br />
                  <label htmlFor="routeLength">Route Length</label>
                  <input
                    type="text"
                    required
                    onChange={this.handleFieldChange}
                    onKeyUp={this.handleKeyUp}
                    value={this.state.routeLength}
                    id="routeLength"
                    placeholder="Time length of route"
                  />
                  <br />
                  <label htmlFor="directions"><b>Route Directions</b></label>
                  <br />
                  <textarea
                    required
                    rows="5"
                    cols="40"
                    onChange={this.handleFieldChange}
                    onKeyUp={this.handleKeyUp}
                    value={this.state.directions}
                    id="directions"
                    placeholder="Directions for route"
                  />
                  <br />
                  <button
                    className="route-btn"
                    type="button"
                    disabled={this.state.loadingStatus}
                    onClick={this.updateExistingRoute}
                  >
                    Submit
                  </button>
                  <button
              type="button"
              disabled={this.loadingStatus}
              className="route-btn"
              onClick={() => {
                this.props.history.push("/dash");
              }}
            >
              Cancel
            </button>
                </div>
              </fieldset>
            </form>

            <ReactMapGL
          className="route-map"
              {...this.state.viewport}
              mapboxApiAccessToken={
                "pk.eyJ1IjoiZHlsYnlsIiwiYSI6ImNrYmh6M2M0YTBhNmcycm04bzF0MGVxNGMifQ.zH776ZxDF0GCyvco-a2WiQ"
              }
              onViewportChange={(viewport) => this.setState({ viewport })}
              onClick={this.handleMapClick}
            >
              <Marker
                longitude={this.state.marker.longitude - 0.0001}
                latitude={this.state.marker.latitude + 0.0001}
              >
                <Pin size={20} />
              </Marker>
            </ReactMapGL>
          </div>
        </>
      );
  }
}

export default TaskEditForm;
