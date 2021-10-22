import React, { Component } from "react";
import { Redirect } from "react-router";
import ContactService from "../services/contact.service";
import AuthService from "../services/auth.service";

export default class ContactTableRow extends Component {
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
        // Populate contact stats
        try {
            const res = await ContactService.getContactStatistics(this.state.currentUser.id, this.props.contact._id);
            this.setState({
                averageRating: res.data.averageRating
                    ? (Math.round(res.data.averageRating * 100) / 100).toFixed(2)
                    : "N/A",
                topCategories: res.data.topCategories,
            });
        } catch (err) {
            console.log(err);
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
                            pathname: "/contact-profile",
                            state: { contactId: this.props.contact._id },
                        }}
                    />
                ) : null}
                <td>{this.props.id}</td>
                <td>{this.props.contact.name}</td>
                <td>{this.props.contact.email}</td>
                <td>{this.state.averageRating}</td>
                <td>
                    <div className="category-containerTable">{this.displayCategories()}</div>
                </td>
            </tr>
        );
    }
}
