import React, { Component } from "react";
import AuthService from "../services/auth.service";
import axios from "axios";
import Table from "react-bootstrap/Table";
import CustomerTableRow from "./customer-table-row.component";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ContactService from "../services/contact.service";

// const showCustomers = (props) => (
//     <tr>
//         <td>{props.customer._id}</td>
//         <td>{props.customer.name}</td>
//         <td>{props.customer.email}</td>
//                 {/* <td>{this.props.obj.score}</td> */}
//                 {/* <td>{this.props.obj.categories}</td> */}
//         <td>
//             <Link className="edit-link" to={"/edit-customer/" + props.customer._id}>
//                 Edit
//             </Link>
//             {/* <Button size="sm" variant="danger">
//                 Delete
//             </Button> */}
//         </td>
//     </tr>
// );

import "../styles/Overview.css";

export default class CustomerList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            customers: [],
        };
    }

    async componentDidMount() {
        try {
            const res = await ContactService.getAllCustomers(this.state.currentUser.id);
            this.setState({
                customers: res.data,
            });
        } catch (err) {
            alert(err);
        }
    }

    // dataTable(){
    //     return this.state.customers.map((res, i) => {
    //         return <CustomerTableRow obj={res} key={i} />;
    //     });
    // }

    displayTable() {
        if (this.state.customers.length === 0) {
            return;
        }
        return this.state.customers.map((currentCustomer, i) => {
            return <CustomerTableRow customer={currentCustomer} key={i} id={i + 1} />;
        });
    }

    render() {
        return (
            <div className="overview-table-wrapper">
                {this.state.customers.length === 0 ? (
                    <div className="overview-no-data-title">No Customers Found</div>
                ) : (
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Relationship Score</th>
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
