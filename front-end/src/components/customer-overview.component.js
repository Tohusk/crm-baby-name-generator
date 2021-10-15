import React, { Component } from "react";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
import CustomerList from "./customer-list.component";
import { Redirect } from "react-router";

import "../styles/Home.css";
import "../styles/Overview.css";

export default class Customers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
        };
    }

    render() {
        if (AuthService.getCurrentUser() == null) {
            alert("Please login first.");

            return <Redirect to={{ pathname: "/login" }} />;
        }
        return (
            <div>
                {/*Page Name*/}
                <div className="overview-pagename">Customers</div>
                <div className="overview-button-box">
                    <Link
                        to="/addcustomer"
                        className="overview-add-btn"
                        // style={{ textDecoration: "none" }}
                    >
                        + Add Customer
                    </Link>
                </div>
                <div className="overview-subheading">Overview</div>
                <div className="overview-flex-container">
                    <div className="overview-stats-card">
                        <div className="overview-card-heading">Total Customers</div>
                        <div className="overview-card-stat">20</div>
                    </div>
                    <div className="overview-stats-card">
                        <div className="overview-card-heading">Satisfaction Score {">"} 4.0</div>
                        <div className="overview-card-stat">51%</div>
                    </div>
                    <div className="overview-stats-card">
                        <div className="overview-card-heading">Number of Customers (graph)</div>
                    </div>
                </div>
                <div className="overview-subheading">Customer List</div>

                <div className="overview-flex-container">
                    <CustomerList></CustomerList>
                </div>
            </div>
        );
    }
}
