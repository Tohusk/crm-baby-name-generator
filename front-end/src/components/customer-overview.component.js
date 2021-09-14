import React, { Component } from "react";
import AuthService from "../services/auth.service";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

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
                    <div className="overview-table-wrapper">
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Satisfaction Score</th>
                                    <th>Preferred Categories</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Mark Otto</td>
                                    <td>otto123@example.com</td>
                                    <td>4.0</td>
                                    <td>Fruit, Vegetable, Dairy</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Bob The Bird</td>
                                    <td>bobbird@example.com</td>
                                    <td>4.5</td>
                                    <td>Bread, Fruit, Dairy</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}
