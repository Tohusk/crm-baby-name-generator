import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

export default class VerticalBar extends Component {
    constructor(props) {
        super(props);

        const dataList = this.props.ratingsFreq;

        this.state = {
            data: dataList,
        };
    }

    showChart() {
        return (
            <div className="home-bar-chart">
                <Bar
                    data={{
                        labels: ["Very Unsatisfied", "Unsatisfied", "Neutral", "Satisfied", "Very Satisfied"],
                        datasets: [
                            {
                                data: this.state.data,
                                backgroundColor: [
                                    "rgba(255, 68, 68, 0.4)",
                                    "rgba(255, 170, 30, 0.4)",
                                    "rgba(255, 215, 68, 0.4)",
                                    "rgba(177, 229, 64, 0.4)",
                                    "rgba(64, 221, 64, 0.4)",
                                ],
                                borderColor: [
                                    "rgba(255, 68, 68, 1)",
                                    "rgba(255, 170, 30, 1)",
                                    "rgba(255, 215, 68, 1)",
                                    "rgba(177, 229, 64, 1)",
                                    "rgba(64, 221, 64, 1)",
                                ],
                                borderWidth: 1,
                            },
                        ],
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
    // Colour background of table row with colour of category
    render() {
        return (
            <div>
                <div>{this.showChart()}</div>
            </div>
        );
    }
}
