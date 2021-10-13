import React, { Component } from "react";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import ProductList from "./product-list.component";
import { Redirect } from "react-router";


import "../styles/Home.css";
import "../styles/Overview.css";

export default class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
        };
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
                <div className="overview-pagename">Products</div>
                <div className="overview-button-box">
                    <Link
                        to="/addproduct"
                        className="overview-add-btn"
                        // style={{ textDecoration: "none" }}
                    >
                        + Add Product
                    </Link>
                </div>
                {/* <break></break> */}
                <div className="overview-subheading">Overview</div>
                <div className="overview-flex-container">
                    <div className="overview-stats-card">
                        <div className="overview-card-heading">Total Products</div>
                        <div className="overview-card-stat">20</div>
                    </div>
                    <div className="overview-stats-card">
                        <div className="overview-card-heading">Top Product of the Week</div>
                        <div className="overview-card-stat">Apples (500g)</div>
                    </div>
                    <div className="overview-stats-card">
                        <div className="overview-card-heading">Products by Categories (chart)</div>
                    </div>
                </div>
                <div className="overview-subheading">Product List</div>

                <div className="overview-flex-container">
                    <ProductList></ProductList>
                </div>
            </div>
        );
    }
}
