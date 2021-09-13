import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import "../styles/Authentication.css";

import AuthService from "../services/auth.service";

import img from "../assets/img-signup.png";
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

const email = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

const vname = (value) => {
    if (value.length < 1 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The name must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeBusinessName = this.onChangeBusinessName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            name: "",
            email: "",
            businessName: "",
            password: "",
            successful: false,
            message: "",
        };
    }

    onChangeUsername(e) {
        this.setState({
            name: e.target.value,
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value,
        });
    }
  
    onChangeBusinessName(e) {
        this.setState({
            businessName: e.target.value,
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value,
        });
    }
  
   async handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false,
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            try {
                const res = await AuthService.register(
                    this.state.name,
                    this.state.email,
                    this.state.businessName,
                    this.state.password
                );

                this.setState({
                    message: res.data.message,
                    successful: true,
                });
            } catch (err) {
                const resMessage =
                    (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

                this.setState({
                    successful: false,
                    message: resMessage,
                });
            }
        }
    }
  render() {
    return (
      <div>
        {/* BBY Logo */}
        <div className="authentication-logo-container">
          <img src={logo} alt="logo"/>
        </div>

        <div className="authentication-content-container">
          <div className = "authentication-left-container">
            <img src={img} alt="loginillustration"/>
          </div>
          <div className="authentication-right-container">
            <div className = "authentication-title-container">Sign Up</div>
            
            <Form
              className="authentication-form"
              onSubmit={this.handleRegister}
              ref={c => {
                this.form = c;
              }}
            >
              {!this.state.successful && (
                <div>
                  <div className="authentication-form-group">
                    <label htmlFor="name">NAME</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChangeUsername}
                      validations={[required, vname]}
                    />
                  </div>

                  <div className="authentication-form-group">
                    <label htmlFor="email">EMAIL</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                      validations={[required, email]}
                    />
                  </div>

                  <div className="authentication-form-group">
                    <label htmlFor="businessName">BUSINESS NAME (Optional)</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="businessName"
                      value={this.state.businessName}
                      onChange={this.onChangeBusinessName}
                      // validations={[required, businessName]}
                    />
                  </div>

                  <div className="authentication-form-group">
                    <label htmlFor="password">PASSWORD</label>
                    <Input
                      type="password"
                      className="form-control"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      validations={[required, vpassword]}
                    />
                  </div>

                  <div className="authentication-form-group">
                    <button className="submitButton">Sign Up</button>
                  </div>

                  Already have an account?
                  <div><a href="/login" className="other-authentication-link">Log in</a></div>
                </div>

              {this.state.message && (
                  <div className="form-group">
                      <div
                          className={this.state.successful ? "alert alert-success" : "alert alert-danger"}
                          role="alert"
                      >
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
