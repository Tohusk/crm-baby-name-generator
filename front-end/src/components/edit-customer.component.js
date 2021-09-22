import React, { Component } from "react";
import AuthService from "../services/auth.service";

import "../styles/EditCustomer.css";

export default class EditCustomer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
        };
    }

    render() {
        return (
            <div className="addCustomer-container">
                {/*Page Name*/}
                <div className="addCustomer-title">Edit Customer Profile</div>

                {/* Input values need to be filled automatically from customer details */}
                <form className="addCustomer-form">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input defaultValue="Kyla Canares"></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input defaultValue="1234567890"></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input defaultValue="mybusiness@gmail.com"></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input defaultValue="Tutor at Unimelb"></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="businessName">Business Name (Optional)</label>
                        <input defaultValue="Baby Name Generator"></input>
                    </div>

                    <div className="addCustomer-submit-group">
                        <a className="addCustomer-cancelButton" href="/home">
                            Cancel
                        </a>
                        <button className="addCustomer-addButton">Save</button>
                    </div>
                </form>
            </div>
        );
    }
}
