import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import "./RouteCard.css"
import RouteManager from "../../modules/RouteManager.js";

//TODO: Add tags to card, not clickable. Filter willl be handled by a dropdown menu at the top of Dashboard

class TaskCard extends Component {

    render() {
      let tagString = ""

      this.props.routeProp["tag-routes"].forEach((tagRoute, i)=> {  
        RouteManager.getSingleTag(tagRoute.id)
        .then(tag => {
          if (i > 0){
            tagString += `, `
          }     
          tagString += `${tag.name}`
          console.log(tagString, i)

          if (i == this.props.routeProp["tag-routes"].length - 1){
            console.log("done")
          }
        })
      })

            return (
              <div className="route-card">
                <div className="route-card-content">
                  <h2>{this.props.routeProp.routeName}</h2>
                  <b>Location: </b>{this.props.routeProp.location.name}
                  <br />
                  <b>Posted by: </b>{this.props.routeProp.user.username}
                  <br />
                  <b>Length: </b>{this.props.routeProp.routeLength}
                  <br/>
                  <b>Tags: </b> {tagString}
                  <br />
                  <br />
                  <h4>Directions: </h4>{this.props.routeProp.directions}
                  <br/>
                  <br/>
                  Posted on {this.props.routeProp.date}
                </div>
              </div>
            );
  }
}

export default TaskCard;