import React, { Component } from "react";
//import the components we will need
import RouteCard from "./RouteCard";
import "./Dashboard.css";
import RouteManager from "../../modules/RouteManager.js";

class TaskList extends Component {
  //define what this component needs to render

  state = {
    routes: [],
    loadingStatus: true,
  };

  componentDidMount() {
    //getAll from TaskManager and hang on to that data; put it in state
    RouteManager.getAllWithInfo().then((routes) => {
      this.setState({
        routes: routes,
        loadingStatus: false,
      });
    });
  }

  render() {
    let sortedRoutes = this.state.routes.sort((a, b) =>
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
            <button
              type="button"
              disabled={this.loadingStatus}
              className="dash-btn"
              onClick={() => {
                this.props.history.push("/add");
              }}
            >
              Filter
            </button>
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
