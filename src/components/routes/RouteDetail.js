import React, { Component } from "react";
import RouteManager from "../../modules/RouteManager";
import CommentManager from "../../modules/CommentManager";
import CommentCard from "../comments/CommentCard";
import CommentForm from "../comments/CommentForm";
import ReactMapGL, { Marker } from "react-map-gl";
import Pin from "./Pin.js";
import "./RouteDetail.css";

class BookDetail extends Component {
  state = {
    id: "",
    userId: "",
    location: "",
    routeName: "",
    username: "",
    routeLength: "",
    tag: "",
    directions: "",
    date: "",
    comments: [],
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

  deleteRoute = () => {
    RouteManager.delete(this.state.id).then(() => {
      CommentManager.getAllWithInfo(this.state.id).then((comments) => {
        comments.forEach((comment) => {
          CommentManager.delete(comment.id);
        });
      });

      this.props.history.push(`/dash`);
    });
  };

  reloadComments = () => {
    this.setState({
      loadingStatus: true,
    });
    RouteManager.getSingleWithInfo(this.props.routeId).then((route) => {
      this.setState({
        comments: route.comments,
        loadingStatus: false,
      });
    });
  };

  deleteComment = (id) => {
    CommentManager.delete(id).then(() => {
      this.reloadComments();
    });
  };

  componentDidMount() {
    //get(id) from RouteManager and hang on to the data; put it into state
    RouteManager.getSingleWithInfo(this.props.routeId).then((route) => {
      this.setState({
        id: route.id,
        userId: route.userId,
        routeName: route.routeName,
        address: route.address,
        username: route.user.username,
        routeLength: route.routeLength,
        tag: route.tag.name,
        directions: route.directions,
        date: route.date,
        comments: route.comments,
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
    });
  }

  render() {
    let sortedComments = this.state.comments.sort((a, b) =>
      a.date > b.date ? 1 : -1
    );

    let splitDirections = this.state.directions.split(`\n`)
    console.log(splitDirections)

    return (
      <>
        <section className="dashboard-content">
          <div className="left-column">
            <div className="route-detail">
              <div className="route-detail-content">
                <h3 className="route-header">{this.state.routeName}</h3>
                <b>Address: </b>
                {this.state.address}
                <br />
                <b>Posted by: </b>
                {this.state.username}
                <br />
                <b>Length: </b>
                {this.state.routeLength}
                <br />
                <b>Purpose: </b> {this.state.tag}
                <br />
                <br />
                <h4>Directions: </h4>
                {splitDirections.map((direction) => {
                  return <p>{direction}</p>
                })}
                <br />
                Posted on {this.state.date}
                <br />
                {this.state.userId === localStorage.getItem("userId") ? (
                  <>
                    <button
                      type="button"
                      disabled={this.loadingStatus}
                      className="route-btn"
                      onClick={() => {
                        this.props.history.push(`/edit/${this.state.id}`);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="route-btn"
                      disabled={this.loadingStatus}
                      type="button"
                      onClick={this.deleteRoute}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <></>
                )}
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
            <div className="comment-section">
              {sortedComments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  commentProp={comment}
                  deleteComment={this.deleteComment}
                />
              ))}
              <CommentForm
                routeId={this.props.routeId}
                reloadComments={this.reloadComments}
              />
            </div>
          </div>
          <section className="map-section">
          <h3>Starting Location</h3>
          <h5>Drag and scroll to change view</h5>
          <ReactMapGL
            className="route-detail-map"
            {...this.state.viewport}
            mapboxApiAccessToken={
              "pk.eyJ1IjoiZHlsYnlsIiwiYSI6ImNrYmh6M2M0YTBhNmcycm04bzF0MGVxNGMifQ.zH776ZxDF0GCyvco-a2WiQ"
            }
            onViewportChange={(viewport) => this.setState({ viewport })}
          >
            <Marker
              longitude={this.state.marker.longitude - 0.0001}
              latitude={this.state.marker.latitude + 0.0001}
            >
              <Pin size={20} />
            </Marker>
          </ReactMapGL>
          </section>
        </section>
      </>
    );
  }
}

export default BookDetail;
