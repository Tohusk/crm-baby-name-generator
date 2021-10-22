import React, { Component } from "react";
import AuthService from "../services/auth.service";
import ProductService from "../services/product.service";
import ContactService from "../services/contact.service";
import TransactionService from "../services/transaction.service";
import { Redirect } from "react-router";
import VerticalBar from "./verticalBar.component";
import PieChart from "./pie.component";
import "../styles/Home.css";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            avgSatisfactionScore: "N/A",
            totalProducts: "N/A",
            mostPopularProduct: "N/A",
            categoryChartStat: [],
            totalRevenue: "N/A",
            ratingsFreq: [],
        };
    }

    async componentDidMount() {
        try {
            const avgSatisfactionScore = await ContactService.getUserAvgRating(this.state.currentUser.id);
            const totalProducts = await ProductService.getTotalProducts(this.state.currentUser.id);
            const productStats = await ProductService.getProductStats(this.state.currentUser.id);
            const salesStats = await TransactionService.getSalesStats(this.state.currentUser.id);

            this.setState({
                avgSatisfactionScore: avgSatisfactionScore?.data.avgUserRating
                    ? avgSatisfactionScore.data.avgUserRating
                    : "N/A",
                totalProducts: totalProducts?.data ? totalProducts.data : "N/A",
                mostPopularProduct: productStats?.data.mostPopularProduct?.name
                    ? productStats.data.mostPopularProduct.name
                    : "N/A",
                categoryChartStat: productStats?.data.categoryStats ? productStats.data.categoryStats : [],
                totalRevenue: salesStats?.data.totalRevenue,
                ratingsFreq: salesStats?.data.ratingsFreq,
            });
        } catch (err) {
            console.log(err);
            this.setState({
                avgSatisfactionScore: "N/A",
                totalProducts: "N/A",
                mostPopularProduct: "N/A",
                categoryChartStat: [],
                totalRevenue: "N/A",
                ratingsFreq: [],
            });
        }
    }

    displayRatingsChart() {
        if (this.state.categoryChartStat.length === 0) {
            return <div className="overview-card-stat">No Data</div>;
        } else {
            return <VerticalBar ratingsFreq={this.state.ratingsFreq} />;
        }
    }

    displayCategoryChart() {
        if (this.state.categoryChartStat.length === 0) {
            return <div className="overview-card-stat">No Data</div>;
        } else {
            return <PieChart categoryChartStat={this.state.categoryChartStat} />;
        }
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
                        <div className="home-chart-heading">Transaction Satisfaction</div>
                        <div>{this.displayRatingsChart()}</div>
                    </div>
                    <div className="home-pie-overview">
                        <div className="home-chart-heading">Category Popularity</div>
                        <div>{this.displayCategoryChart()}</div>
                    </div>
                </div>
                <div className="home-stats">
                    <div className="home-stats-card">
                        <div className="overview-card-heading">Average Relationship Score</div>
                        <div className="overview-card-stat">{this.state.avgSatisfactionScore}</div>
                    </div>
                    <div className="home-stats-card">
                        <div className="overview-card-heading">Total Products</div>
                        <div className="overview-card-stat">{this.state.totalProducts}</div>
                    </div>
                    <div className="home-stats-card">
                        <div className="overview-card-heading">Most Popular Product</div>
                        <div className="overview-card-stat">{this.state.mostPopularProduct}</div>
                    </div>
                    <div className="home-stats-card">
                        <div className="overview-card-heading">Total Revenue</div>
                        <div className="overview-card-stat">${this.state.totalRevenue}</div>
                    </div>
                </div>
            </div>
        );
    }
}
