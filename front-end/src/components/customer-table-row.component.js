import React, { Component } from "react";
import { Redirect } from "react-router";
import ContactService from "../services/contact.service";
import AuthService from "../services/auth.service";

export default class CustomerTableRow extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            redirect: false,
            averageRating: "N/A",
            topCategories: [],
        };
    }

    handleClick(e) {
        this.setState({
            redirect: true,
        });
    }

    async componentDidMount() {
        try {
            const res = await ContactService.getContactStatistics(this.state.currentUser.id, this.props.customer._id);
            this.setState({
                averageRating: res.data.averageRating
                    ? (Math.round(res.data.averageRating * 100) / 100).toFixed(2)
                    : "N/A",
                topCategories: res.data.topCategories,
            });
        } catch (err) {
            alert(err);
        }
    }

    displayCategories() {
        if (this.state.topCategories.length === 0) {
            return <div>N/A</div>;
        }
        return this.state.topCategories.map((currentCategory) => {
            return (
                <div
                    key={currentCategory.id}
                    className="category-containerTag"
                    style={{ background: currentCategory.colour }}
                >
                    {currentCategory.name}
                </div>
            );
        });
    }

    render() {
        return (
            <tr className="overview-table-row" onClick={this.handleClick}>
                {this.state.redirect ? (
                    <Redirect
                        to={{
                            pathname: "/customer-profile",
                            state: { contactId: this.props.customer._id },
                        }}
                    />
                ) : null}
                <td>{this.props.id}</td>
                <td>{this.props.customer.name}</td>
                <td>{this.props.customer.email}</td>
                <td>{this.state.averageRating}</td>
                <td>
                    <div className="category-containerTable">{this.displayCategories()}</div>
                </td>
                {/* <td>{this.props.obj.score}</td> */}
                {/* <td>{this.props.obj.categories}</td> */}
            </tr>
        );
    }
}
