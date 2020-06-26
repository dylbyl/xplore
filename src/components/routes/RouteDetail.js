import React, { Component } from "react";
import RouteManager from "../../modules/RouteManager";
import CommentManager from "../../modules/CommentManager";
import CommentCard from "../comments/CommentCard"
import CommentForm from "../comments/CommentForm"

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
    loadingStatus: true
  };

  deleteRoute = () => {
    RouteManager.delete(this.state.id).then(() => {

      CommentManager.getAllWithInfo(this.state.id).then((comments) => {
        comments.forEach((comment) => {
          CommentManager.delete(comment.id)
        })
      })

      this.props.history.push(`/dash`)
    });
  };

  reloadComments = () => {
    this.setState({
      loadingStatus: true
    })
    RouteManager.getSingleWithInfo(this.props.routeId).then((route) => {
      this.setState({
          comments: route.comments,
          loadingStatus: false
      });
  })
  }

  deleteComment = (id) => {
    CommentManager.delete(id).then(() => {
      this.reloadComments()
    })
  }

  componentDidMount() {

    //get(id) from RouteManager and hang on to the data; put it into state
    RouteManager.getSingleWithInfo(this.props.routeId).then((route) => {
        this.setState({
            id: route.id,
            userId: route.userId,
            routeName: route.routeName,
            location: route.location.name,
            username: route.user.username,
            routeLength: route.routeLength,
            tag: route.tag.name,
            directions: route.directions,
            date: route.date,
            comments: route.comments,
            loadingStatus: false
        });
    })
  }

  render() {
    let sortedComments = this.state.comments.sort((a, b) =>
    a.date > b.date ? 1 : -1
  );

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
          {this.state.userId == localStorage.getItem("userId") ? 
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
          <button className="route-btn" disabled={this.loadingStatus} type="button" onClick={this.deleteRoute}>Delete</button>
          </>
          :
          <></>
          }
          
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
              <CommentCard key={comment.id} commentProp={comment} deleteComment={this.deleteComment}/>
            ))}
            <CommentForm routeId={this.props.routeId} reloadComments={this.reloadComments}/>
      </div>
      </section>
      </>
    );
  }
}

export default BookDetail;