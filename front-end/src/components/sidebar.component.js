import React, { Component } from "react";
import AuthService from "../services/auth.service";
import { withRouter } from "react-router";
import logo from "../assets/logo.png";

import "../styles/Sidebar.css";

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
        };
    }

    handleLogout() {
        AuthService.logout();
        this.props.history.push("/login");
    }

    render() {
        return (
            <div className="sidebar">
                {/*Logo*/}
                <div className="sidebar-logo-container">
                    <img src={logo} alt="logo"></img>
                </div>

                {/*Buttons*/}
                <a className="side-text-link" href="/home">
                    <div className="side-text">
                        <span className="sidebar-icon-container">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1.3em"
                                height="1.3em"
                                fillRule="currentColor"
                                className="bi bi-house-door"
                                viewBox="0 0 16 16"
                            >
                                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z" />
                            </svg>
                        </span>
                        Home
                    </div>
                </a>
                <a className="side-text-link" href="/sales">
                    <div className="side-text">
                        <span className="sidebar-icon-container">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1.3em"
                                height="1.3em"
                                fillRule="currentColor"
                                className="bi bi-basket3"
                                viewBox="0 0 16 16"
                            >
                                <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM3.394 15l-1.48-6h-.97l1.525 6.426a.75.75 0 0 0 .729.574h9.606a.75.75 0 0 0 .73-.574L15.056 9h-.972l-1.479 6h-9.21z" />
                            </svg>
                        </span>
                        Sales
                    </div>
                </a>
                <a className="side-text-link" href="/customers">
                    <div className="side-text">
                        <span className="sidebar-icon-container">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1.3em"
                                height="1.3em"
                                fillRule="currentColor"
                                className="bi bi-people"
                                viewBox="0 0 16 16"
                            >
                                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                            </svg>
                        </span>
                        Customers
                    </div>
                </a>
                <a className="side-text-link" href="/products">
                    <div className="side-text">
                        <span className="sidebar-icon-container">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1.3em"
                                height="1.3em"
                                fillRule="currentColor"
                                className="bi bi-box-seam"
                                viewBox="0 0 16 16"
                            >
                                <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
                            </svg>
                        </span>
                        Products
                    </div>
                </a>
                {/* implement logout logic */}
                <button className="side-text-button" onClick={this.handleLogout}>
                    <div className="sidebar-logout">
                        <span className="sidebar-icon-container">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1.3em"
                                height="1.3em"
                                fillRule="currentColor"
                                className="bi bi-box-arrow-in-left"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"
                                />
                                <path
                                    fillRule="evenodd"
                                    d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                                />
                            </svg>
                        </span>
                        Log out
                    </div>
                </button>
            </div>
        );
    }
}

export default withRouter(Sidebar);
