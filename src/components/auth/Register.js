import React, { Component } from "react";
import RegisterManager from "../../modules/RegisterManager.js";
import "../home/Home.css";

class RegisterForm extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    users: [],
    loadingStatus: true,
  };

  handleFieldChange = (evt) => {
    const stateToChange = {};

    stateToChange[evt.target.id] = evt.target.value;
    console.log("evt.target.id", evt.target.id);
    console.log("stateToChange", stateToChange);
    this.setState(stateToChange);
  };

  /*  Local method for validation, set loadingStatus, create animal      object, invoke the AnimalManager post method, and redirect to the full animal list
   */
  constructNewUser = (evt) => {
    evt.preventDefault();
    this.setState({ loadingStatus: true });
    if (
      this.state.username === "" ||
      this.state.email === "" ||
      this.state.password === ""
    ) {
      window.alert("Please input all fields");
    } else {
      let register = true;

      this.state.users.forEach((user) => {
        if (user.email === this.state.email && register === true) {
          window.alert("This email address has already been taken!");
          register = false;
        } else if (user.username === this.state.username && register === true) {
          window.alert("This username has already been taken!");
          register = false
        }
      });

      if (register === true) {
        
        const newUser = {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
        };

        // Create the animal and redirect user to animal list
        RegisterManager.post(newUser).then(() => this.props.history.push("/"));
      }else{
        this.setState({ loadingStatus: false });
      }
    }
  };

  componentDidMount() {
    //getAll from TaskManager and hang on to that data; put it in state
    RegisterManager.getAll().then((users) => {
      this.setState({
        users: users,
        loadingStatus: false,
      });
      console.log(this.state.users);
    });
  }

  render() {
    return (
      <>
        <form className="home-form">
          <fieldset>
              <h3 className="home-header-large">Register an account</h3>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                required
                onChange={this.handleFieldChange}
                id="username"
                placeholder="Username"
              />
              <br />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                required
                onChange={this.handleFieldChange}
                id="email"
                placeholder="email"
              />
              <br />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                required
                onChange={this.handleFieldChange}
                id="password"
                placeholder="password"
              />
            </div>

              <button
              className="home-btn"
                type="button"
                disabled={this.state.loadingStatus}
                onClick={this.constructNewUser}
              >
                Register
              </button>
              <button
              className="home-btn"
            disabled={this.state.loadingStatus}
            type="button"
            onClick={() => {
              this.props.history.push("/login");
            }}
          >
            Back to Login
          </button>
          </fieldset>
        </form>
      </>
    );
  }
}

export default RegisterForm;
