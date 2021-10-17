import React, { Component, isValidElement } from "react";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
import CustomerList from "./customer-list.component";
import ContactService from "../services/contact.service";
import { Redirect } from "react-router";
import { Line } from "react-chartjs-2";

import "../styles/Home.css";
import "../styles/Overview.css";

export default class Customers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            avgScore: "N/A",
            totalContacts: 0,
            labels: [],
            datasets: [],
        };
    }

    getGraphData(allContacts) {
        // Loop through all contacts and find dates to make labels,
        // number of customers on those dates is data
        const customerDatesHashMap = {};
        for (const contact of allContacts) {
            if (contact.dateAdded !== undefined) {
                customerDatesHashMap[contact.dateAdded.substring(0, 10)] =
                    (customerDatesHashMap[contact.dateAdded.substring(0, 10)] || 0) + 1;
            }
        }

        let labels = [];
        let data = [];
        for (const entry in customerDatesHashMap) {
            labels.push(entry);
            data.push(customerDatesHashMap[entry]);
        }

        const datasets = [
            {
                data: data,
                fill: true,
                borderColor: "rgb(82, 137, 223)",
                backgroundColor: "rgba(165, 222, 255, 0.4)",
            },
        ];

        this.setState({
            labels: labels,
            datasets: datasets,
        });
    }

    async componentDidMount() {
        try {
            const res = await ContactService.getUserAvgRating(this.state.currentUser.id);
            const allContacts = await ContactService.getAllCustomers(this.state.currentUser.id);
            const numContacts = allContacts.data.length;

            this.getGraphData(allContacts.data);

            if (res.data.avgUserRating !== null) {
                this.setState({
                    avgScore: res.data.avgUserRating,
                    totalContacts: numContacts,
                });
            }
        } catch (err) {
            this.setState({
                avgScore: "N/A",
                totalContacts: "N/A",
            });
        }
    }

    showCustomerChart() {
        if (this.state.labels.length === 0) {
            return <div className="overview-card-stat">No Data</div>;
        } else {
            return (
                <Line
                    data={{
                        labels: this.state.labels,
                        datasets: this.state.datasets,
                    }}
                    height={100}
                    options={{
                        plugins: {
                            legend: {
                                display: false,
                            },
                        },
                        scales: {
                            yAxes: {
                                ticks: {
                                    stepSize: 1,
                                },
                            },
                        },
                    }}
                />
            );
        }
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
                        <div className="overview-card-heading">Number of Customers</div>
                        {this.showCustomerChart()}
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
