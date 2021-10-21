import React, { Component } from "react";
import AuthService from "../services/auth.service";
import axios from "axios";
import Table from "react-bootstrap/Table";
import ContactTableRow from "./contact-table-row.component";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ContactService from "../services/contact.service";

import "../styles/Overview.css";

export default class ContactList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            contacts: [],
        };
    }

    async componentDidMount() {
        try {
            // Save all contacts into state
            const res = await ContactService.getAllContacts(this.state.currentUser.id);
            this.setState({
                contacts: res.data,
            });
        } catch (err) {
            alert(err);
        }
    }

    displayTable() {
        if (this.state.contacts.length === 0) {
            return;
        }
        // For every contact render a table row
        return this.state.contacts.map((currentContact, i) => {
            return <ContactTableRow contact={currentContact} key={i} id={i + 1} />;
        });
    }

    render() {
        return (
            <div className="overview-table-wrapper">
                {this.state.contacts.length === 0 ? (
                    <div className="overview-no-data-title">No Contacts Found</div>
                ) : (
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Satisfaction Score</th>
                                <th>Preferred Categories</th>
                            </tr>
                        </thead>
                        <tbody>{this.displayTable()}</tbody>
                    </Table>
                )}
            </div>
        );
    }
}
