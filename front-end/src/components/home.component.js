import React, { Component } from "react";
import AuthService from "../services/auth.service";

import "../styles/Home.css";

export default class Home extends Component {
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
                <div className="home-pagename">Home</div>
                <div className="homepagesubtitle">Sales Overview</div>
                <div className="home-overview">
                    <div className="home-overview-stats"></div>
                    <div className="home-overview-stats"></div>
                    <div className="home-overview-stats"></div>
                </div>
                <div className="homepagesubtitle">Customer Overview</div>
                <div className="home-overview">
                    <div className="home-overview-stats"></div>
                    <div className="home-overview-stats"></div>
                    <div className="home-overview-stats"></div>
                </div>
                <div className="homepagesubtitle">Products Overview</div>
                <div className="home-overview">
                    <div className="home-overview-stats"></div>
                    <div className="home-overview-stats"></div>
                    <div className="home-overview-stats"></div>
                </div>

                <Sidebar />
            </div>
        );
    }
}
