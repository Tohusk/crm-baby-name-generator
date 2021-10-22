import React, { Component } from "react";
import AuthService from "../services/auth.service";
import { withRouter } from "react-router";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import ContactService from "../services/contact.service";
import { Redirect } from "react-router";

import "../styles/AddItem.css";

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

class AddContact extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCompanyName = this.onChangeCompanyName.bind(this);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            name: "",
            phoneNumber: "",
            email: "",
            description: "",
            companyName: "",
            loading: false,
            message: "",
        };
    }

    async handleSubmit(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true,
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            try {
                const res = await ContactService.addNewContact(
                    this.state.name,
                    this.state.email,
                    this.state.phoneNumber,
                    this.state.companyName,
                    this.state.description,
                    this.state.currentUser.id
                );
                // Show success message
                this.setState({
                    message: res.data.message,
                    loading: false,
                });
                this.props.history.push("/Contacts");
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

    onChangeName(e) {
        this.setState({
            name: e.target.value,
        });
    }

    onChangePhoneNumber(e) {
        this.setState({
            phoneNumber: e.target.value,
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value,
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value,
        });
    }

    onChangeCompanyName(e) {
        this.setState({
            companyName: e.target.value,
        });
    }

    render() {
        if (AuthService.getCurrentUser() == null) {
            alert("Please login first.");

            return <Redirect to={{ pathname: "/login" }} />;
        }
        return (
            <div className="addItem-container">
                <div className="addItem-title">Add Contact</div>
                <Form
                    className="addContact-form"
                    onSubmit={this.handleSubmit}
                    ref={(c) => {
                        this.form = c;
                    }}
                >
                    <div className="addContact-form-group">
                        <label htmlFor="name">NAME (Required)</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChangeName}
                            validations={[required]}
                        />
                    </div>

                    <div className="addContact-form-group">
                        <label htmlFor="phoneNumber">PHONE NUMBER</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="phoneNumber"
                            value={this.state.phoneNumber}
                            onChange={this.onChangePhoneNumber}
                        />
                    </div>

                    <div className="addContact-form-group">
                        <label htmlFor="email">EMAIL</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                        />
                    </div>

                    <div className="addContact-form-group">
                        <label htmlFor="description">DESCRIPTION</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="description"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>

                    <div className="addContact-form-group">
                        <label htmlFor="companyName">BUSINESS NAME</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="companyName"
                            value={this.state.companyName}
                            onChange={this.onChangeCompanyName}
                        />
                    </div>

                    <div className="addContact-submit-group">
                        <a className="addContact-cancelButton" href="/contacts">
                            Cancel
                        </a>
                        <button className="submitButton" disabled={this.state.loading}>
                            {this.state.loading && <span className="spinner-border spinner-border-sm"></span>}
                            Add
                        </button>
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
        );
    }
}

export default withRouter(AddContact);
