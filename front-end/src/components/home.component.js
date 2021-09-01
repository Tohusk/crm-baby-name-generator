import React, { Component } from "react";
import AuthService from "../services/auth.service";


import "../styles/Home.css";
import logo from '../assets/logo.png';

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

        
        {/*SideBar*/}
        <div className = "side-bar">
          {/*Logo*/}
          <div className="logo-container">
            <img src={logo} alt="logo" ></img>
          </div>

          {/*Buttons*/}
          <div className = "side-text">
            Account name
          </div>
          <div className = "side-text">
            Home
          </div>
          <div className = "side-text">
            Sales
          </div>
          <div className = "side-text">
            Customers
          </div>
          <div className = "side-text">
            Products
          </div>
          <div className = "settings">
            Settings
          </div>
            
        </div>

      </div>

    );
  }
}
