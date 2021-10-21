import React, { Component } from "react";
import TransactionService from "../services/transaction.service";
import AuthService from "../services/auth.service";

export default class TransactionTableRow extends Component {
    constructor(props) {
        super(props);
        this.deleteOneTrans = this.deleteOneTrans.bind(this);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
        };
    }

    async deleteOneTrans() {
        try {
            if (window.confirm("Are you sure you wish to delete this?")) {
                const res = await TransactionService.deleteTransaction(this.state.currentUser.id, this.props.transaction._id);
                // Refresh to refresh category table
                //TODO: trigger a rerender of the table only instead of the entire page
                window.location.reload();
            }
        } catch (err) {
            alert("Error deleting transaction");
        }
    }

    render() {
        return (
            <tr className="overview-table-row">
                <td>{this.props.id}</td>
                <td>{this.props.transaction.dateAdded.substring(0, 10)}</td>
                <td>{this.props.transaction.contactName}</td>
                <td>${(Math.round(this.props.transaction.transactionTotal * 100) / 100).toFixed(2)}</td>
                <td>
                    <button className="editCategory-delete" onClick={this.deleteOneTrans}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.3em"
                            height="1.3em"
                            fillRule="currentColor"
                            className="bi bi-x"
                            viewBox="0 0 16 16"
                        >
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </button>
                </td>
            </tr>
        );
    }
}
