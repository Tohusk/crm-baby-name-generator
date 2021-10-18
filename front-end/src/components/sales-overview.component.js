import React, { Component } from "react";
import AuthService from "../services/auth.service";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { Redirect } from "react-router";

import "../styles/Home.css";
import "../styles/Overview.css";
import TransactionList from "./transaction-list.component";

export default class Sales extends Component {
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
                <div className="overview-pagename">Sales</div>
                <div className="overview-button-box">
                    <Link
                        to="/addtransaction"
                        className="overview-add-btn"
                        // style={{ textDecoration: "none" }}
                    >
                        + Add Sales
                    </Link>
                </div>
                <div className="overview-subheading">Overview</div>
                <div className="overview-flex-container">
                    <div className="overview-stats-card">
                        <div className="overview-card-heading">Number of Sales</div>
                        <div className="overview-card-stat">20</div>
                    </div>
                    <div className="overview-stats-card">
                        <div className="overview-card-heading">Overall Revenue</div>
                        <div className="overview-card-stat">$20300</div>
                    </div>
                    <div className="overview-stats-card">
                        <div className="overview-card-heading">Average Revenue</div>
                        <div className="overview-card-stat">$6200</div>
                    </div>
                </div>
                <div className="overview-subheading">Recent Transaction History</div>

                <div className="overview-flex-container">
                    <TransactionList></TransactionList>
                </div>
            </div>
        );
    }
}
