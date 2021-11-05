import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import UserService from "../services/user.service";
import ContactService from "../services/contact.service";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Redirect } from "react-router";

import "../styles/Contact-Profile.css";
import "../styles/Category.css";

class ContactProfile extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);

        this.state = {
            currentUser: UserService.getCurrentUser(),
            currentContact: "",
            averageRating: "",
            topCategories: [],
        };
    }

    async handleDelete(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true,
        });

        try {
            if (window.confirm("Are you sure you wish to delete this?")) {
                const res = await ContactService.deleteContact(
                    this.state.currentUser.id,
                    this.state.currentContact._id
                );
                this.setState({
                    message: res.data.message,
                    loading: false,
                });
                this.props.history.push("/contacts");
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

    //we can check the id from currentUser from user models
    //contactId is specified in contacttablerow
    async componentDidMount() {
        try {
            // Grab contact details
            const contact = await ContactService.getOneContact(
                this.state.currentUser.id,
                this.props.location.state.contactId
            );

            // Grab contact stats
            const stats = await ContactService.getContactStatistics(
                this.state.currentUser.id,
                this.props.location.state.contactId
            );
            this.setState({
                currentContact: contact.data,
                averageRating: stats.data.averageRating
                    ? (Math.round(stats.data.averageRating * 100) / 100).toFixed(1)
                    : "N/A",
                topCategories: stats.data.topCategories,
            });
        } catch (err) {
            this.setState({
                currentContact: "",
            });
        }
    }

    displayCategories() {
        if (this.state.topCategories.length === 0) {
            return <div>N/A</div>;
        }
        return this.state.topCategories.map((currentCategory) => {
            return (
                <div
                    key={currentCategory.id}
                    className="category-containerTag"
                    style={{ background: currentCategory.colour }}
                >
                    {currentCategory.name}
                </div>
            );
        });
    }

    render() {
        if (UserService.getCurrentUser() == null) {
            alert("Please login first.");

            return <Redirect to={{ pathname: "/login" }} />;
        }
        return (
            <div>
                <div className="contactProfile-smallText">
                    <a className="contactProfile-backButton" href="/contacts">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-arrow-left-short"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                            />
                        </svg>
                        Back
                    </a>
                </div>
                {/*Page Name*/}
                <div className="contactProfile-pageTitleMedium">Contact Profile</div>

                <div className="contactProfile-topContainer">
                    <div className="contactProfile-profile-container">
                        <DropdownButton id="dropdown-basic-button" className="contactProfile-dropdown" variant="">
                            <div className="contactProfile-link-container">
                                <Link
                                    className="contactProfile-dropdown-link"
                                    to={{
                                        pathname: "/editcontact",
                                        state: { contact: this.state.currentContact },
                                    }}
                                >
                                    Edit
                                </Link>
                            </div>
                            <div className="contactProfile-deleteButton-container">
                                <button className="contactProfile-deleteButton" onClick={this.handleDelete}>
                                    Delete
                                </button>
                            </div>
                        </DropdownButton>
                        <div className="contactProfile-smallerText">NAME</div>
                        <div className="contactProfile-userText">{this.state.currentContact.name}</div>
                        <div className="contactProfile-smallerText">PHONE</div>
                        <div className="contactProfile-userText">
                            {this.state.currentContact.phoneNumber ? (
                                this.state.currentContact.phoneNumber
                            ) : (
                                <div> N/A </div>
                            )}
                        </div>
                        <div className="contactProfile-smallerText">EMAIL</div>
                        <div className="contactProfile-userText">
                            {this.state.currentContact.email ? (
                                <u>{this.state.currentContact.email}</u>
                            ) : (
                                <div> N/A </div>
                            )}
                        </div>
                        <div className="contactProfile-smallerText">DESCRIPTION</div>
                        <div className="contactProfile-userText">
                            {this.state.currentContact.description ? (
                                this.state.currentContact.description
                            ) : (
                                <div> N/A </div>
                            )}
                        </div>
                        <div className="contactProfile-smallerText">BUSINESS NAME</div>
                        <div className="contactProfile-userText">
                            {this.state.currentContact.companyName ? (
                                this.state.currentContact.companyName
                            ) : (
                                <div> N/A </div>
                            )}
                        </div>
                    </div>

                    <div className="contactProfile-score-container">
                        <div className="contactProfile-smallerText">SATISFACTION SCORE</div>
                        <div className="contactProfile-userText">{<td>{this.state.averageRating}</td>}</div>
                        <div className="contactProfile-smallerText">PREFERRED CATEGORY</div>
                        <div className="category-containerProfile">{this.displayCategories()}</div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(ContactProfile);
