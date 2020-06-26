import React, { Component } from "react";
import RouteManager from "../../modules/RouteManager";
import RouteSelect from "./RouteSelect"
import "./RouteForm.css"


class TaskEditForm extends Component {
  //set the initial state
  state = {
    id: "",
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

  updateExistingRoute = (evt) => {
    evt.preventDefault();
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
            id: this.state.id,
          userId: 1,
          locationId: this.state.locationId,
          routeName: this.state.routeName,
          routeLength: this.state.routeLength,
          directions: this.state.directions,
          tagId: this.state.tagId,
          date: this.state.date
        };

      // Create the task and redirect user to task list
      RouteManager.update(route).then(() => this.props.history.push("/dash"));
    }
  };

  componentDidMount() {
    RouteManager.getSingleWithInfo(this.props.routeId).then((route) => {
        this.setState({
            id: route.id,
            routeName: route.routeName,
            locationId: route.location.id,
            username: route.user.username,
            routeLength: route.routeLength,
            tagId: route.tag.id,
            directions: route.directions,
            date: route.date,
            loadingStatus: false
        });

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
                  <label htmlFor="locationId">Starting Location</label>
                  <select
                    name="locationId"
                    id="locationId"
                    onChange={this.handleFieldChange}
                    selectedIndex={this.state.locationId}
                    value={this.state.locationId}
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
          </div>
        </>
      );
  }
}

export default TaskEditForm;
