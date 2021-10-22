import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import "../styles/Authentication.css";

import AuthService from "../services/auth.service";

import img from "../assets/img-login.png";
import logo from "../assets/logo.png";

// If argument is empty, then return a div bar warning message
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
                // After successful login, redirect to homepage
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
                {/* BBY Logo */}
                <div className="authentication-logo-container">
                    <img src={logo} alt="logo" />
                </div>

                <div className="authentication-content-container">
                    <div className="authentication-left-container">
                        <img src={img} alt="loginillustration" />
                    </div>
                    <div className="authentication-right-container">
                        <div className="authentication-title-container">Log in</div>

                        <Form
                            className="authentication-form"
                            onSubmit={this.handleLogin}
                            ref={(c) => {
                                this.form = c;
                            }}
                        >
                            <div className="authentication-form-group">
                                <label htmlFor="email">EMAIL</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
                                    validations={[required]}
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
                                    validations={[required]}
                                />
                            </div>

                            <div className="authentication-form-group">
                                <button className="submitButton" disabled={this.state.loading}>
                                    {this.state.loading && <span className="spinner-border spinner-border-sm"></span>}
                                    Login
                                </button>
                                <a href="/register" className="other-authentication-link">
                                    Sign up
                                </a>
                            </div>

                            {this.state.message && (
                                <div className="authentication-form-group">
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
