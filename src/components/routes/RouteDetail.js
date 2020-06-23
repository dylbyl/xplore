import React, { Component } from "react";
import RouteManager from "../../modules/RouteManager";

class BookDetail extends Component {
  state = {
    id: "",
    location: "",
    routeName: "",
    username: "",
    routeLength: "",
    tag: "",
    directions: "",
    date: "",
    loadingStatus: true
  };

  deleteRoute = () => {
    RouteManager.delete(this.state.id).then(() => {
      this.props.history.push(`/dash`)
    });
  };

  componentDidMount() {
    console.log("BookDetail: ComponentDidMount");
    let checkoutString = "";

    //get(id) from RouteManager and hang on to the data; put it into state
    RouteManager.getSingleWithInfo(this.props.routeId).then((route) => {
        this.setState({
            id: route.id,
            routeName: route.routeName,
            location: route.location.name,
            username: route.user.username,
            routeLength: route.routeLength,
            tag: route.tag.name,
            directions: route.directions,
            date: route.date,
            loadingStatus: false
        });
    })
  }

  render() {
    return (
      <>
      <section className="dashboard-content">
      <div className="route-card">
        <div className="route-card-content">
        <h3 className="route-header">{this.state.routeName}</h3>
          <b>Location: </b>{this.state.location}
          <br />
          <b>Posted by: </b>{this.state.username}
          <br />
          <b>Length: </b>{this.state.routeLength}
          <br/>
          <b>Purpose: </b> {this.state.tag}
          <br />
          <br />
          <h4>Directions: </h4>{this.state.directions}
          <br/>
          <br/>
          Posted on {this.state.date}
          <br />
          <button className="route-btn" type="button" onClick={this.deleteRoute}>Delete</button>
          <button
            type="button"
            disabled={this.loadingStatus}
            className="route-btn"
            onClick={() => {
              this.props.history.push("/dash");
            }}
          >
            Back
          </button>
        </div>
      </div>
      </section>
      </>
    );
  }
}

export default BookDetail;