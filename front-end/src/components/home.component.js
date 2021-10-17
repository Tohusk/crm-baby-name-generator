import React, { Component } from "react";
import AuthService from "../services/auth.service";
import { Redirect } from "react-router";

import VerticalBar from "./verticalBar.component";
import PieChart from "./pie.component";

import "../styles/Home.css";

export default class Home extends Component {
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
                <div className="overview-pagename">Home</div>
                <div className="home-charts">
                <div className="home-bar-overview">
                    {/* <HomeChart> </HomeChart> */}
                    <VerticalBar></VerticalBar>
                    {/* <Chart></Chart> */}
                    {/* <RainFall></RainFall> */}
                </div>
                <div className="home-pie-overview">
                    <PieChart></PieChart>
                </div>
                </div>
                <div className="home-stats">

                    {/* <div className="home-stats-card">
                        <div className="overview-card-heading">Total Customers</div>
                        <div className="overview-card-stat">20</div>
                    </div> */}
                    <div className="home-stats-card">
                        <div className="overview-card-heading">Satisfaction Score {">"} 4.0</div>
                        <div className="overview-card-stat">51%</div>
                    </div>
                    <div className="home-stats-card">
                        <div className="overview-card-heading">Total Products</div>
                        <div className="overview-card-stat">10</div>
                    </div>
                    <div className="home-stats-card">
                        <div className="overview-card-heading">Most Popular Product</div>
                        <div className="overview-card-stat">Bananas</div>
                    </div>
                    <div className="home-stats-card">
                        <div className="overview-card-heading">Average Revenue</div>
                        <div className="overview-card-stat">$6200</div>
                    </div>
                    
                </div>

            </div>
            
        );
    }
}
