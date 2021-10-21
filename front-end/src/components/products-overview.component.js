import React, { Component } from "react";
import AuthService from "../services/auth.service";
import ProductService from "../services/product.service";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import ProductList from "./product-list.component";
import { Redirect } from "react-router";
import "../styles/Home.css";
import "../styles/Overview.css";
import CategoryOverview from "./category-overview.component";
import { Pie } from "react-chartjs-2";

export default class Products extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            totalProducts: 0,
            mostPopularProduct: "N/A",
            // for chart
            labels: [],
            datasets: [
                {
                    backgroundColor: [],
                    data: [],
                },
            ],
        };
    }

    async componentDidMount() {
        try {
            const total = await ProductService.getTotalProducts(this.state.currentUser.id);
            const stats = await ProductService.getProductStats(this.state.currentUser.id);

            const labelList = [];
            const colourList = [];
            const dataList = [];
            for (const c of stats.data.categoryStats) {
                labelList.push(c.name);
                colourList.push(c.colour);
                dataList.push(c.count);
            }

            const datasetList = [
                {
                    backgroundColor: colourList,
                    data: dataList,
                },
            ];

            this.setState({
                totalProducts: total.data,
                mostPopularProduct: stats.data.mostPopularProduct ? stats.data.mostPopularProduct.name : "N/A",
                labels: labelList,
                datasets: datasetList,
            });
        } catch (err) {
            this.setState({
                totalProducts: "N/A",
            });
        }
    }

    showCategoryChart() {
        if (this.state.labels.length === 0) {
            return <div className="overview-card-stat">No Data</div>;
        } else {
            return (
                <Pie
                    data={{
                        labels: this.state.labels,
                        datasets: this.state.datasets,
                    }}
                    options={{
                        plugins: {
                            legend: {
                                display: false,
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
                <div className="overview-pagename">Products</div>
                <div className="overview-button-box">
                    <Link to="/addproduct" className="overview-add-btn">
                        + Add Product
                    </Link>
                </div>
                <div className="overview-subheading">Overview</div>
                <div className="overview-product-flex-container">
                    <div className="overview-product-stats">
                        <div className="overview-stats-card">
                            <div className="overview-card-heading">Total Products</div>
                            <div className="overview-card-stat">{this.state.totalProducts}</div>
                        </div>
                        <div className="overview-stats-card">
                            <div className="overview-card-heading">Most Popular Product</div>
                            <div className="overview-card-stat">{this.state.mostPopularProduct}</div>
                        </div>
                    </div>
                    <div className="overview-pie-chart-card">
                        <div className="overview-chart-heading">Popularity by Categories</div>
                        <div>{this.showCategoryChart()}</div>
                    </div>
                </div>
                <div className="overview-subheading">Categories</div>
                <div className="category-flex-container">
                    <CategoryOverview></CategoryOverview>
                    <div className="overview-button-box">
                        <Link to="/editCategory" className="overview-add-btn">
                            Edit Categories
                        </Link>
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
