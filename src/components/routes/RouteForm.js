import React, { Component} from "react";
import RouteManager from "../../modules/RouteManager";
import RouteSelect from "./RouteSelect";
import "./RouteForm.css"
import ReactMapGL, { Marker} from "react-map-gl";
import Pin from "./Pin.js";
import MapboxManager from "../../modules/MapboxManager"

class RouteForm extends Component {
  state = {
    locationId: undefined,
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

  handleLocationChange = (evt) => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
    this.state.locations.forEach(location => {
       if (location.id === evt.target.value){
         const viewport = {
          ...this.state.viewport,
          longitude: location.longitude,
          latitude: location.latitude,
          zoom: 16,
        };
    
        const marker = {
          ...this.state.marker,
          longitude: location.longitude,
          latitude: location.latitude,
        };
        this.setState({ viewport, marker })
       }
    })
  };

  /*  Local method for validation, set loadingStatus, create task      object, invoke the TaskManager post method, and redirect to the full task list
   */
  constructNewRoute = (evt) => {
    evt.preventDefault();

    let today = this.state.date
    let monthZero = "";
      let dayZero = "";

      if (today.getMonth() + 1 < 10) {
        monthZero = "0";
      }
      if (today.getDate() < 10) {
        dayZero = "0";
      }

      let todayString =
        monthZero +
        (today.getMonth() +
        1) +
        "/" +
        dayZero +
        today.getDate() +
        "/" +
        today.getFullYear();

    if (
      this.state.routeName === "" ||
      this.state.routeLength === "" ||
      this.state.directions === "" ||
      this.state.marker.longitude == null ||
      this.state.tagId === undefined
    ) {
      window.alert("Please input something in all fields and select a location on the map");
    } else {
      MapboxManager.getAddress(this.state.marker.longitude, this.state.marker.latitude)
      .then((results) => {

        let addressName = results.features[0]["place_name"]
        this.setState({ loadingStatus: true });
        const route = {
          userId: localStorage.getItem("userId"),
          address: addressName,
          routeName: this.state.routeName,
          routeLength: this.state.routeLength,
          directions: this.state.directions,
          tagId: this.state.tagId,
          longitude: this.state.marker.longitude,
          latitude: this.state.marker.latitude,
          date: todayString
        };
  
        // Create the task and redirect user to task list
        RouteManager.post(route).then(() => this.props.history.push("/dash"));
      })
    }
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

  componentDidMount() {
    RouteManager.getAllTags().then((tags) => {
      this.setState({
          tags: tags,
          loadingStatus: false,
        });
      });
  }

  render() {
    return (
      <>
        <div className="route-center">
          <form>
            <fieldset>
              <div className="route-form">
                <h3 className="route-header">Add a New Route</h3>
                <b>Select a starting location on the map</b>
                <br />
                <label htmlFor="routeName">Route Name</label>
                <input
                  type="text"
                  required
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
                  id="routeLength"
                  placeholder="Time length of route"
                />
                <br />
                <label htmlFor="directions"><b>Route Directions, separated by line break</b></label>
                <br />
                <textarea
                  required
                  rows="5"
                  cols="40"
                  onChange={this.handleFieldChange}
                  id="directions"
                  placeholder="Directions for route"
                />
                <br />
                <button
                  className="route-btn"
                  type="button"
                  disabled={this.state.loadingStatus}
                  onClick={this.constructNewRoute}
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

export default RouteForm;
