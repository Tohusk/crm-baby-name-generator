import React, { Component, isValidElement } from "react";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
import ContactList from "./contact-list.component";
import ContactService from "../services/contact.service";
import { Redirect } from "react-router";
import { Line } from "react-chartjs-2";

import "../styles/Home.css";
import "../styles/Overview.css";

export default class Contacts extends Component {
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
        // number of contacts on those dates is data
        const contactDatesHashMap = {};
        let total = 0;
        contactDatesHashMap[" "] = total;
        for (const contact of allContacts) {
            if (contact.dateAdded !== undefined) {
                if (!contactDatesHashMap[contact.dateAdded.substring(0, 7)]) {
                    contactDatesHashMap[contact.dateAdded.substring(0, 7)] =
                        (contactDatesHashMap[contact.dateAdded.substring(0, 7)] || 0) + total + 1;
                } else {
                    contactDatesHashMap[contact.dateAdded.substring(0, 7)] =
                        (contactDatesHashMap[contact.dateAdded.substring(0, 7)] || 0) + 1;
                }
                total++;
            }
        }

        let labels = [];
        let data = [];
        for (const entry in contactDatesHashMap) {
            labels.push(entry);
            data.push(contactDatesHashMap[entry]);
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
            const allContacts = await ContactService.getAllContacts(this.state.currentUser.id);
            console.log(allContacts.data);
            const numContacts = allContacts.data.length;
            console.log(numContacts);

            this.getGraphData(allContacts.data);

            this.setState({
                totalContacts: numContacts,
            });

            if (res.data.avgUserRating !== null) {
                this.setState({
                    avgScore: (Math.round(res.data.avgUserRating * 100) / 100).toFixed(2),
                });
            }
        } catch (err) {
            this.setState({
                avgScore: "N/A",
                totalContacts: "N/A",
            });
        }
    }

    showContactChart() {
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
                <div className="overview-pagename">Contacts</div>
                <div className="overview-button-box">
                    <Link to="/addcontact" className="overview-add-btn">
                        + Add Contact
                    </Link>
                </div>
                <div className="overview-subheading">Overview</div>
                <div className="overview-flex-container">
                    <div className="overview-stats">
                        <div className="overview-stats-card">
                            <div className="overview-card-heading">Total Contacts</div>
                            <div className="overview-card-stat">{this.state.totalContacts}</div>
                        </div>
                        <div className="overview-stats-card">
                            <div className="overview-card-heading">Average Satisfaction Score</div>
                            <div className="overview-card-stat">{this.state.avgScore}</div>
                        </div>
                    </div>
                    <div className="overview-graph-card">
                        <div className="overview-card-heading">Number of Contacts</div>
                        {this.showContactChart()}
                    </div>
                </div>
                <div className="overview-subheading">Contact List</div>

                <div className="overview-flex-container">
                    <ContactList></ContactList>
                </div>
            </div>
        );
    }
}
