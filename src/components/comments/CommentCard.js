import React, { Component } from "react";
import "../routes/RouteCard.css";

//TODO: Add tags to card, not clickable. Filter willl be handled by a dropdown menu at the top of Dashboard

class CommentCard extends Component {
  render() {
    return (
      <div className="route-card">
        <div className="route-card-content">
          Posted by <b>{this.props.commentProp.username}</b> on{" "}
          {this.props.commentProp.date}:
          <br />
          {this.props.commentProp.text}
          <br />
          {this.props.commentProp.userId === localStorage.getItem("userId") ? (
            <button
              type="button"
              className="route-btn"
              onClick={() =>
                this.props.deleteComment(this.props.commentProp.id)
              }
            >
              Delete
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
}

export default CommentCard;
