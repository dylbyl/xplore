import React, { Component } from "react";
import RegisterManager from "../../modules/RegisterManager";
import "../home/Home.css";

class Login extends Component {
  // Set initial state
  state = {
    email: "",
    password: "",
    users: "",
    loadingStatus: true,
  };

  // Update state whenever an input field is edited
  handleFieldChange = (evt) => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  handleLogin = (e) => {
    e.preventDefault();
    let login = false;
    let loginUserId = 0;
    let loginUsername = ""
    /*
        For now, just store the email and password that
        the customer enters into local storage.
    */ this.state.users.forEach(
      (user) => {
        if (
          this.state.email === user.email &&
          this.state.password === user.password
        ) {
          login = true;
          loginUserId = user.id;
          loginUsername = user.username;
        }
      }
    );
    if (login === true) {
      localStorage.setItem("userId", loginUserId);
      localStorage.setItem("username", loginUsername);
      this.props.history.push("/");
    } else {
      window.alert("Your email and password combination was not recognized!");
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
      <form className="home-form" onSubmit={this.handleLogin}>
        <fieldset>
          <h3 className="home-header-large">Please sign in</h3>
          <div className="home-form">
          <label htmlFor="inputEmail">Email address</label>
            <input
              onChange={this.handleFieldChange}
              type="email"
              id="email"
              placeholder="Email address"
              required=""
              autoFocus=""
            />
            <br />
            <label htmlFor="inputPassword">Password</label>
            <input
              onChange={this.handleFieldChange}
              type="password"
              id="password"
              placeholder="Password"
              required=""
            />
          </div>
          <button
            className="home-btn"
            disabled={this.state.loadingStatus}
            type="submit"
          >
            Login
          </button>
          <button
            className="home-btn"
            disabled={this.state.loadingStatus}
            type="button"
            onClick={() => {
              this.props.history.push("/register");
            }}
          >
            Register instead
          </button>
        </fieldset>
      </form>
    );
  }
}

export default Login;