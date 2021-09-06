import React, { Component } from "react";
import AuthService from "../services/auth.service";

import "../styles/AddTransaction.css";

export default class AddTransaction extends Component {
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
        <div className="addCustomer-title">New Transaction</div>

        <div className="addTransaction-left-container">

        </div>
        <div className="addTransaction-right-container">

        </div>
      </div>

    );
  }
}
