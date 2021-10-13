import React, { Component } from "react";
import AuthService from "../services/auth.service";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

import "../styles/Home.css";
import "../styles/Overview.css";

export default class Sales extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
        };
    }

    render() {
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
                    <div className="overview-table-wrapper">
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Customer Name</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>01/02/2020 4:15PM</td>
                                    <td>Tom Smith</td>
                                    <td>$60.00</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>01/02/2020 7:15PM</td>
                                    <td>Mark Otto</td>
                                    <td>$10.50</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}
