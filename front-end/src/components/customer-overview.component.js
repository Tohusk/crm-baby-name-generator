import React, { Component } from "react";
import AuthService from "../services/auth.service";

import "../styles/Home.css";
import Sidebar from "./sidebar.component";

export default class Customers extends Component {
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
            Customers
        </div>
        <div className="flex-container" >
        <div className="subheading">
                Overview
            </div>
        </div>
        <div className="flex-container" >
            <div className="subheading">
                Customer List
            </div>
            
        </div>


        <Sidebar/>

      </div>

    );
  }
}