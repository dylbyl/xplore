import React, { Component} from "react";
import CommentManager from "../../modules/CommentManager";
import "../routes/RouteForm.css"

class CommentForm extends Component {
  state = {
    text: "",
    date: new Date(),
    loadingStatus: false,
  };

  handleFieldChange = (evt) => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  /*  Local method for validation, set loadingStatus, create task      object, invoke the TaskManager post method, and redirect to the full task list
   */
  constructNewRoute = (evt) => {
    evt.preventDefault();

    let today = this.state.date
    let monthZero = "";
      let dayZero = "";

      if (today.getMonth() + 1 < 10) {
        monthZero = "0";
      }
      if (today.getDate() < 10) {
        dayZero = "0";
      }

      let todayString =
        monthZero +
        (today.getMonth() +
        1) +
        "/" +
        dayZero +
        today.getDate() +
        "/" +
        today.getFullYear();

    if (
      this.state.text === ""
    ) {
      window.alert("Please input something in all fields");
    } else {
      this.setState({ loadingStatus: true });
      const comment = {
        userId: localStorage.getItem("userId"),
        username: localStorage.getItem("username"),
        routeId: this.props.routeId,
        text: this.state.text,
        date: todayString
      };

      // Create the task and redirect user to task list
      CommentManager.post(comment).then(() => {
          this.setState({
            text: "",
              loadingStatus: false
          })
          this.props.reloadComments()
        });
    }
  };

  render() {
    return (
      <>
        <div className="route-center">
          <form>
            <fieldset>
              <div className="route-form">
                <h3 className="route-header">Add a Comment</h3>
                <textarea
                  type="text"
                  required
                  rows="5"
                  cols="60"
                  onChange={this.handleFieldChange}
                  id="text"
                  placeholder="Comment text"
                  value={this.state.text}
                />
                <br />
                <button
                  className="route-btn"
                  type="button"
                  disabled={this.state.loadingStatus}
                  onClick={this.constructNewRoute}
                >
                  Submit
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </>
    );
  }
}

export default CommentForm;