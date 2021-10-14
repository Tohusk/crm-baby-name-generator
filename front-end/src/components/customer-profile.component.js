import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import ContactService from "../services/contact.service";
import DropdownButton from 'react-bootstrap/DropdownButton'
import { Redirect } from "react-router";

import "../styles/Customer-Profile.css";
import "../styles/Category.css";

class CustomerProfile extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);


        this.state = {
            currentUser: AuthService.getCurrentUser(),
            currentContact: "",
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

    //we can check the id from currentUser from user models
    //contactId is specified in customertablerow
    async componentDidMount() {
        try {
            // contactId is specified in customer-table-row
            const res = await ContactService.getOneCustomer(
                this.state.currentUser.id,
                this.props.location.state.contactId
            );
            this.setState({
                currentContact: res.data,
            });
        } catch (err) {
            this.setState({
                currentContact: "",
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
            <div>
                <div className="customerProfile-smallText">
                    <a className="customerProfile-backButton" href="/customers">
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
                <div className="customerProfile-pageTitleMedium">Customer Profile</div>

                <div className="customerProfile-topContainer">
                    <div className="customerProfile-profile-container">
                        <DropdownButton 
                            id="dropdown-basic-button"
                            className="customerProfile-dropdown"
                            variant="">
                            <div className="customerProfile-link-container">
                                <Link
                                    className="customerProfile-dropdown-link"
                                    to={{
                                        pathname: "/editcustomer",
                                        state: { contact: this.state.currentContact },
                                    }}
                                >
                                Edit
                                </Link>
                            </div>
                            <div className="customerProfile-deleteButton-container">
                                <button className="customerProfile-deleteButton" onClick={this.handleDelete}>Delete</button>
                            </div>
                        </DropdownButton>
                        <div className="customerProfile-smallerText">NAME</div>
                        <div className="customerProfile-userText">{this.state.currentContact.name}</div>
                        <div className="customerProfile-smallerText">PHONE</div>
                        <div className="customerProfile-userText">
                            {this.state.currentContact.phoneNumber ? (
                                this.state.currentContact.phoneNumber
                            ) : (
                                <div> N/A </div>
                            )}
                        </div>
                        <div className="customerProfile-smallerText">EMAIL</div>
                        <div className="customerProfile-userText">
                            
                                {this.state.currentContact.email ? <u>{this.state.currentContact.email}</u> : <div> N/A </div>}
                            
                        </div>
                        <div className="customerProfile-smallerText">DESCRIPTION</div>
                        <div className="customerProfile-userText">
                            {this.state.currentContact.description ? (
                                this.state.currentContact.description
                            ) : (
                                <div> N/A </div>
                            )}
                        </div>
                        <div className="customerProfile-smallerText">BUSINESS NAME</div>
                        <div className="customerProfile-userText">
                            {this.state.currentContact.companyName ? (
                                this.state.currentContact.companyName
                            ) : (
                                <div> N/A </div>
                            )}
                        </div>
                    </div>

                    <div className="customerProfile-score-container">
                        <div className="customerProfile-smallerText">SATISFACTION SCORE</div>
                        <div className="customerProfile-userText">
                            {this.state.currentContact.satisfactionScore ? (
                                this.state.currentContact.satisfactionScore
                            ) : (
                                <div>N/A</div>
                            )}
                        </div>
                        <div className="customerProfile-smallerText">PREFERRED CATEGORY</div>
                        <div className="category-containerProfile">
                            <div className="category-containerTag" style={{ background: "#ffd873" }}>
                                Fruits
                            </div>
                            <div className="category-containerTag" style={{ background: "#e0bdfb" }}>
                                Veges
                            </div>
                        </div>
                    </div>
                </div>

                {/* Need to implement logic */}
                <div className="customerProfile-pageTitleMedium">
                    Transaction History
                    <a className="customerProfile-transaction-button" href="/addtransaction">
                        {" "}
                        +Add Transaction{" "}
                    </a>
                </div>
                <div className="customerProfile-tranhis-container">
                    <div className="customerProfile-tran-log">
                        <span className="customerProfile-tran-log-text">#</span>
                        <span className="customerProfile-tran-log-text">First</span>
                        <span className="customerProfile-tran-log-text">Last</span>
                        <span className="customerProfile-tran-log-text">Handle</span>
                    </div>
                </div>
            </div>
        )
        
    }
}
export default withRouter(CustomerProfile);
