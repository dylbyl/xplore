import React, { Component } from "react";
import "./RouteCard.css"

//TODO: Add tags to card, not clickable. Filter willl be handled by a dropdown menu at the top of Dashboard

class TaskCard extends Component {

    render() {
            return (
              
              <div className="route-card">
                <div className="route-card-content">
                  <h2>{this.props.routeProp.routeName}</h2>
                  <b>Address: </b>{this.props.routeProp.address}
                  <br />
                  <b>Length: </b>{this.props.routeProp.routeLength}
                  <br/>
                  <b>Purpose: </b> {this.props.routeProp.tag.name}
                  <br />
                  <button className="dash-btn"
                  type="button"
                  onClick={() => {
                    this.props.history.push(`/routes/${this.props.routeProp.id}`)}}>Details</button>
                </div>
              </div>
            );
  }
}

export default TaskCard;