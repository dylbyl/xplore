import React, { Component, useState } from "react";
import RouteManager from "../../modules/RouteManager";
import RouteSelect from "./RouteSelect";
import "./RouteForm.css"

class RouteForm extends Component {
  state = {
    locationId: undefined,
    routeName: "",
    routeLength: "",
    directions: "",
    tagId: undefined,
    tags: [],
    locations: [],
    date: new Date(),
    loadingStatus: true,
  };

  handleFieldChange = (evt) => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
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
      this.state.locationId === undefined ||
      this.state.tagId === undefined
    ) {
      window.alert("Please input something in all fields");
    } else {
      this.setState({ loadingStatus: true });
      const route = {
        userId: localStorage.getItem("userId"),
        locationId: this.state.locationId,
        routeName: this.state.routeName,
        routeLength: this.state.routeLength,
        directions: this.state.directions,
        tagId: this.state.tagId,
        date: todayString
      };

      // Create the task and redirect user to task list
      RouteManager.post(route).then(() => this.props.history.push("/dash"));
    }
  };

  componentDidMount() {
    //getAll from TaskManager and hang on to that data; put it in state
    RouteManager.getAllTags().then((tags) => {
      this.setState({
        tags: tags
      });

      RouteManager.getAllLocations().then((locations) => {
        this.setState({
          locations: locations,
          loadingStatus: false,
        });
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
                <label htmlFor="locationId">Starting Location</label>
                <select
                  name="locationId"
                  id="locationId"
                  onChange={this.handleFieldChange}
                >
                  <option value="undefined">--Select--</option>
                  {this.state.locations.map((locationFromState) => (
                    <RouteSelect selectProp={locationFromState} key={locationFromState.id} />
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
                <label htmlFor="directions"><b>Route Directions</b></label>
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
        </div>
      </>
    );
  }
}

export default RouteForm;
