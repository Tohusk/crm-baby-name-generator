import React, { Component } from "react";
import AuthService from "../services/auth.service";
import TransactionService from "../services/transaction.service";
import Table from "react-bootstrap/Table";
import TransactionTableRow from "./transaction-table-row.component";

import "../styles/Overview.css";

export default class TransactionList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            transactions: [],
        };
    }

    async componentDidMount() {
        try {
            const trans = await TransactionService.getAllTransactions(this.state.currentUser.id);
            this.setState({
                transactions: trans.data,
            });
        } catch (err) {
            alert(err);
        }
    }

    displayTable() {
        if (this.state.transactions.length === 0) {
            return ;
        }
        return this.state.transactions.map((currentTransaction, i) => {
            return <TransactionTableRow transaction={currentTransaction} key={i} id={i + 1}/>;
        });
    }

    render() {
        return (
            <div className="overview-table-wrapper">
                {this.state.transactions.length === 0 ?
                    <div className="overview-no-data-title">No Transactions Found</div>
                    :
                    <Table bordered hover>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Customer</th>
                            <th>Total</th>
                        </tr>
                        </thead>
                        <tbody>{this.displayTable()}</tbody>
                    </Table>
                }
            </div>
        );
    }
}
