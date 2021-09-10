import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import "../styles/Authentication.css";

import AuthService from "../services/auth.service";

import img from "../assets/img-login.png";
import logo from "../assets/logo.png";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      email: "",
      password: "",
      loading: false,
      message: "",
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  async handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      try {
        await AuthService.login(this.state.email, this.state.password);
        this.props.history.push("/home");
        window.location.reload();
      } catch (err) {
        const resMessage =
          (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

        this.setState({
          loading: false,
          message: resMessage,
        });
      }
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    return (
      <div>
        <div className="logo-container">
          <img src={logo} alt="logo"></img>
          {/* <img src="https://source.unsplash.com/random" alt="baby"></img> */}
        </div>
        <div className="flex-container">
          <img src={img} alt="loginillustration" />
          {/* <div className="left-container">
            {/* <h1>CRM for Small Businesses</h1> */}

          {/* <img src="https://source.unsplash.com/random" alt="baby"></img>
          </div> */}

          {/* <div className = "vl"></div> */}

          <div className="right-container">
            <div className="log-in-container">Log in</div>

            <Form
              onSubmit={this.handleLogin}
              ref={(c) => {
                this.form = c;
              }}
            >
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block" disabled={this.state.loading}>
                  {this.state.loading && <span className="spinner-border spinner-border-sm"></span>}
                  <span>Login</span>
                </button>
                <span>
                  <a href="/register">Sign up</a>
                </span>
              </div>

              {this.state.message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {this.state.message}
                  </div>
                </div>
              )}

              <CheckButton
                style={{ display: "none" }}
                ref={(c) => {
                  this.checkBtn = c;
                }}
              />
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
