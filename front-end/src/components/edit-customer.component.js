import React, { Component } from "react";
import AuthService from "../services/auth.service";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import ContactService from "../services/contact.service";
import { Redirect } from "react-router";

import "../styles/EditCustomer.css";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

class EditCustomer extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCompanyName = this.onChangeCompanyName.bind(this);

        if (AuthService.getCurrentUser()){
            this.state = {
                currentUser: AuthService.getCurrentUser(),
                currentContact: this.props.location.state.contact,
                newName: this.props.location.state.contact.name,
                newPhoneNumber: this.props.location.state.contact.phoneNumber,
                newEmail: this.props.location.state.contact.email,
                newDescription: this.props.location.state.contact.description,
                newCompanyName: this.props.location.state.contact.companyName,
    
                loading: false,
                message: "",
            };
        }
        
    }

    onChangeName(e) {
        this.setState({
            newName: e.target.value,
        });
    }

    onChangePhoneNumber(e) {
        this.setState({
            newPhoneNumber: e.target.value,
        });
    }

    onChangeEmail(e) {
        this.setState({
            newEmail: e.target.value,
        });
    }

    onChangeDescription(e) {
        this.setState({
            newDescription: e.target.value,
        });
    }

    onChangeCompanyName(e) {
        this.setState({
            newCompanyName: e.target.value,
        });
    }

    async handleDelete(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true,
        });

        try {
            if (window.confirm("Are you sure you wish to delete this?")) {
                const res = await ContactService.deleteCustomer(this.state.currentUser.id, this.state.currentContact._id);
                this.setState({
                    message: res.data.message,
                    loading: false,
                });
                this.props.history.push('/customers');
            }
        } catch (err) {
            const resMessage =
                (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
            this.setState({
                loading: false,
                message: resMessage,
            });
        }
    }

    async handleSubmit(e) {
        // Use update
        e.preventDefault();

        this.setState({
            message: "",
            loading: true,
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            try {
                const res = await ContactService.updateCustomer(
                    this.state.newName,
                    this.state.newEmail,
                    this.state.newPhoneNumber,
                    this.state.newCompanyName,
                    this.state.newDescription,
                    this.state.currentUser.id,
                    this.state.currentContact._id
                );
                this.setState({
                    message: res.data.message,
                    loading: false,
                });
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
        if (AuthService.getCurrentUser() == null){
            alert("Please login first.");

            return(
                <Redirect to={{ pathname: '/login' }} />
            )
        }
        return (
            <div className="addItem-container">
                {/*Page Name*/}
                <div className="addItem-title">Edit Customer Profile</div>
                <button className="editCustomer-deleteContainer" onClick={this.handleDelete}>
                    <u>Delete Customer</u>
                </button>
                {/* Input values need to be filled automatically from customer details */}
                <Form
                    className="addCustomer-form"
                    onSubmit={this.handleSubmit}
                    ref={(c) => {
                        this.form = c;
                    }}
                >
                    <div className="addCustomer-form-group">
                        <label htmlFor="name">NAME (Required)</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="name"
                            value={this.state.currentContact.name}
                            onChange={this.onChangeName}
                            validations={[required]}
                        />
                    </div>
                    <div className="addCustomer-form-group">
                        <label htmlFor="phoneNumber">PHONE NUMBER</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="phoneNumber"
                            value={this.state.currentContact.phoneNumber}
                            onChange={this.onChangePhoneNumber}
                        />
                    </div>
                    <div className="addCustomer-form-group">
                        <label htmlFor="email">EMAIL</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="email"
                            value={this.state.currentContact.email}
                            onChange={this.onChangeEmail}
                        />
                    </div>
                    <div className="addCustomer-form-group">
                        <label htmlFor="description">DESCRIPTION</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="description"
                            value={this.state.currentContact.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="addCustomer-form-group">
                        <label htmlFor="companyName">BUSINESS NAME</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="companyName"
                            value={this.state.currentContact.companyName}
                            onChange={this.onChangeCompanyName}
                        />
                    </div>
                    <div className="addCustomer-submit-group">
                        <Link
                            className="addCustomer-cancelButton"
                            to={{
                                pathname: "/customer-profile",
                                state: { contactId: this.state.currentContact._id },
                            }}
                        >
                            Cancel
                        </Link>
                        <button className="submitButton" disabled={this.state.loading}>
                            {this.state.loading && <span className="spinner-border spinner-border-sm"></span>}
                            Update
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

export default withRouter(EditCustomer);
