import React, { Component } from "react";
import AuthService from "../services/auth.service";
import axios from "axios";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import "../styles/Home.css";
import "../styles/Overview.css";
import TransactionList from "./transaction-list.component";
import TransactionService from "../services/transaction.service";
import { Bar } from 'react-chartjs-2';

export default class Sales extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            numTrans: 'N/A',
            totalRevenue: 'N/A',
            ratingsFreq: [],
        };
    }

    async componentDidMount() {
        try {
            const allTrans = await TransactionService.getAllTransactions(this.state.currentUser.id);
            const numTrans = allTrans.data.length;

            const stats = await TransactionService.getSalesStats(this.state.currentUser.id);

            const totalRevenue = stats.data.totalRevenue;
            const ratingsFreq = stats.data.ratingsFreq;

            this.setState({
                numTrans: numTrans,
                totalRevenue: totalRevenue,
                ratingsFreq: ratingsFreq,
            });

        } catch (err) {
            this.setState({
                numTrans: 'N/A',
                totalRevenue: 'N/A',
                ratingsFreq: [],
            });
        }
    }

    displayRatingsGraph() {
        if (this.state.ratingsFreq.length === 0) {
            return <div className="overview-card-stat">No Data</div>;
        } else {
            return (
                <div>
                    <Bar
                        data={{
                            labels: ['Very Unsatisfied', 'Unsatisfied', 'Neutral', 'Satisfied', 'Very Satisfied'],
                            datasets: [{
                                data: this.state.ratingsFreq,
                                backgroundColor: [
                                    'rgba(255, 68, 68, 0.2)',
                                    'rgba(255, 170, 30, 0.2)',
                                    'rgba(255, 215, 68, 0.2)',
                                    'rgba(177, 229, 64, 0.2)',
                                    'rgba(64, 221, 64, 0.2)'
                                ],
                                borderColor: [
                                    'rgba(255, 68, 68, 1)',
                                    'rgba(255, 170, 30, 1)',
                                    'rgba(255, 215, 68, 1)',
                                    'rgba(177, 229, 64, 1)',
                                    'rgba(64, 221, 64, 1)'
                                ],
                                borderWidth: 1,
                            }],
                        }}
                        options={{
                            plugins: {
                                legend: {
                                    display: false,
                                },
                            },
                        }}
                    />
                </div>
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
                <div className="overview-sales-flex-container">
                    <div className="overview-stats">
                        <div className="overview-stats-card">
                            <div className="overview-card-heading">Number of Sales</div>
                            <div className="overview-card-stat">{this.state.numTrans}</div>
                        </div>
                        <div className="overview-stats-card">
                            <div className="overview-card-heading">Total Revenue</div>
                            <div className="overview-card-stat">${this.state.totalRevenue}</div>
                        </div>
                    </div>
                    <div className="overview-graph-card">
                        <div className="overview-card-heading">Transaction Ratings</div>
                        <div>{this.displayRatingsGraph()}</div>
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
