import React, { Component } from "react";
//import the components we will need
import RouteCard from "./RouteCard";
import "./Dashboard.css"
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
          routes : routes,
          loadingStatus: false
      })
    });
  }

  render() {

    return (
      <>
        <section className="dashboard-content">
          <div className="route-card-container">
            {this.state.routes.map((route) => (
              <RouteCard
                key={route.id}
                routeProp={route}
                {...this.props}
              />
            ))}
          </div>
        </section>
      </>
    );
  }
}

export default TaskList;
