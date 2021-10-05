import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import ContactService from "../services/contact.service";
import DropdownButton from 'react-bootstrap/DropdownButton'

import "../styles/Customer-Profile.css";

class CustomerProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            currentContact: "",
        };
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
        return (
            <div>
                <div className="customerProfile-smallText">
                    <a className="customerProfile-backButton"href="/customers">                    
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
                            <Link
                                className="customerProfile-dropdown-link"
                                to={{
                                    pathname: "/editcustomer",
                                    state: { contact: this.state.currentContact },
                                }}
                            >
                            Edit
                            </Link>
                        </DropdownButton>
                        <div className="customerProfile-smallerText">NAME</div>
                        <div className="customerProfile-userText">{this.state.currentContact.name}</div>
                        <div className="customerProfile-smallerText">PHONE</div>
                        <div className="customerProfile-userText">
                            {this.state.currentContact.phoneNumber ? (
                                this.state.currentContact.phoneNumber
                            ) : (
                                <div> no phone number</div>
                            )}
                        </div>
                        <div className="customerProfile-smallerText">EMAIL</div>
                        <div className="customerProfile-userText">
                            <u>
                                {this.state.currentContact.email ? this.state.currentContact.email : <div> no email</div>}
                            </u>
                        </div>
                        <div className="customerProfile-smallerText">DESCRIPTION</div>
                        <div className="customerProfile-userText">
                            {this.state.currentContact.description ? (
                                this.state.currentContact.description
                            ) : (
                                <div> no description</div>
                            )}
                        </div>
                        <div className="customerProfile-smallerText">COMPANY NAME</div>
                        <div className="customerProfile-userText">
                            {this.state.currentContact.companyName ? (
                                this.state.currentContact.companyName
                            ) : (
                                <div> no company name</div>
                            )}
                        </div>         



                    </div>

                    <div className="customerProfile-score-container">
                        <div className="customerProfile-smallerText">SATISFACTION SCORE</div>
                        <div className="customerProfile-userText">1.2</div>
                        <div className="customerProfile-smallerText">PREFERRED CATEGORY</div>
                        <div className="customerProfile-userText">Fruits</div>
                    </div>
                </div>
                
                {/* Need to implement logic */}
                <div className="customerProfile-pageTitleMedium">
                    Transaction History
                    <a className="customerProfile-transaction-button" href="/addtransaction"> +Add Transaction </a>
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
        );
    }
}
export default withRouter(CustomerProfile);
