import React, { Component } from "react";
//import the components we will need
import RouteCard from "./RouteCard";
import "./Dashboard.css";
import RouteManager from "../../modules/RouteManager.js";
import RouteSelect from "./RouteSelect"

class TaskList extends Component {
  //define what this component needs to render

  state = {
    routes: [],
    tags: [],
    tagId: "undefined",
    loadingStatus: true,
  };

  handleFilterChange = (evt) => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  componentDidMount() {
    //getAll from TaskManager and hang on to that data; put it in state
    RouteManager.getAllWithInfo().then((routes) => {
      this.setState({
        routes: routes
      });
      RouteManager.getAllTags().then((tags) => {
        this.setState({
          tags: tags,
          loadingStatus: false
        });
    });
  })
}

  render() {
    let filteredRoutes = ""

    if (this.state.tagId == "undefined"){
      filteredRoutes = this.state.routes
    }
    else {
      filteredRoutes = this.state.routes.filter(route => route.tag.id == this.state.tagId)
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
            <select
                  name="tagId"
                  id="tagId"
                  onChange={this.handleFilterChange}
                >
                  <option value="undefined">--Select a tag to filter--</option>
                  <option value="undefined">None</option>
                  {this.state.tags.map((tagFromState) => (
                    <RouteSelect selectProp={tagFromState} key={tagFromState.id} />
                  ))}
                </select>
          </section>
          <div className="route-card-container">
            {sortedRoutes.map((route) => (
              <RouteCard key={route.id} routeProp={route} {...this.props}/>
            ))}
          </div>
            
        </section>
      </>
    );
  }
}

export default TaskList;
