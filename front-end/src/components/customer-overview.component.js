import React, { Component, isValidElement } from "react";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
import CustomerList from "./customer-list.component";
import ContactService from "../services/contact.service";
import { Redirect } from "react-router";
import { Bar } from 'react-chartjs-2';

import "../styles/Home.css";
import "../styles/Overview.css";

export default class Customers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            avgScore: 'N/A',
            totalContacts: 0,
        };
    }

    async componentDidMount() {
        try {
            const res = await ContactService.getUserAvgRating(this.state.currentUser.id);
            const allContacts = await ContactService.getAllCustomers(this.state.currentUser.id);
            const numContacts = allContacts.data.length;

            if (res.data.avgUserRating !== null) {
                this.setState({
                    avgScore: res.data.avgUserRating,
                    totalContacts: numContacts,
                });
            }
            else {
                this.setState({
                    totalContacts: numContacts,
                });
            }
        } catch (err) {
            this.setState({
                avgScore: 'N/A',
                totalContacts: 'N/A',
            });
        }
    }

    render() {
        if (AuthService.getCurrentUser() == null){
            alert("Please login first.");

                return(
                    <Redirect to={{ pathname: '/login' }} />
                )
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
                    <div className="overview-stats">
                        <div className="overview-stats-card">
                            <div className="overview-card-heading">Total Customers</div>
                            <div className="overview-card-stat">{this.state.totalContacts}</div>
                        </div>
                        <div className="overview-stats-card">
                            <div className="overview-card-heading">Average Satisfaction Score</div>
                            <div className="overview-card-stat">{this.state.avgScore}</div>
                        </div>
                    </div>
                    <div className="overview-graph-card">
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
