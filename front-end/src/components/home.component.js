import React, { Component } from "react";
import AuthService from "../services/auth.service";

import "../styles/Home.css";

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



      </div>

    );
  }
}
