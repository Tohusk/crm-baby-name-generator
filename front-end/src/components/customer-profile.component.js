import React, { Component } from "react";
import AuthService from "../services/auth.service";

import "../styles/Customer-Profile.css";

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
                <div className="smallText">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-arrow-left-short"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                        />
                    </svg>
                    Back
                </div>
                {/*Page Name*/}
                <div className="pageTitleMedium">Customer Profile</div>

                <div className="profile-container">
                    <div className="smallerText">NAME</div>
                    <div className="userText">Kyla Canares</div>
                    <div className="smallerText">PHONE</div>
                    <div className="userText">100000</div>
                    <div className="smallerText">EMAIL</div>
                    <div className="userText">
                        <u> gamer@gamer.com </u>
                    </div>
                    <div className="smallerText">DESCRIPTION</div>
                    <div className="userText">Tutor</div>
                </div>
                <div className="score-container">
                    <div className="smallerText">SATISFACTION SCORE</div>
                    <div className="userText">1.2</div>
                    <div className="smallerText">PREFERRED CATEGORY</div>
                    <div className="userText">Fruits</div>
                </div>
                <br></br>
                <br></br>
                <br></br>

                <div className="pageTitleMedium">
                    Transaction History
                    <span className="transaction-button">
                        <u>+Add Transaction</u>
                    </span>
                </div>
                <div className="tranhis-container">
                    <div className="tran-log">
                        <span className="tran-log-text">#</span>
                        <span className="tran-log-text">First</span>
                        <span className="tran-log-text">Last</span>
                        <span className="tran-log-text">Handle</span>
                    </div>
                </div>
            </div>
        );
    }
}
