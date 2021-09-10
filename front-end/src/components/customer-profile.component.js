import React, { Component } from "react";
import AuthService from "../services/auth.service";

import "../styles/Customer-Profile.css";
import Sidebar from "./sidebar.component";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  render() {

    return (
      <div >
        {/*Page Name*/}
        <div className = "pagename">
            Home
        </div>


        <Sidebar/>

      </div>

    );
  }
}
