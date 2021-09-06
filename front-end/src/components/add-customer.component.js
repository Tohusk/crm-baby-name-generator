import React, { Component } from "react";
import AuthService from "../services/auth.service";

import "../styles/AddCustomer.css";
import Sidebar from "./sidebar.component";

export default class AddCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  render() {

    return (
      <div className="addCustomer-container">
        {/*Page Name*/}
        <div className="addCustomer-title">Add Customer</div>

        <form className="addCustomer-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input></input>
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input></input>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input></input>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input></input>
              </div>

              <div className="form-group">
                <label htmlFor="businessName">Business Name (Optional)</label>
                <input></input>
              </div>

              <div className="addCustomer-submit-group">
                <a className="addCustomer-cancelButton" href = "/home">Cancel</a>
                <button className="addCustomer-addButton">Add</button>
              </div>  
            </form>


        

      </div>

    );
  }
}
