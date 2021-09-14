import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default class CustomerTableRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.customer._id}</td>
                <td>{this.props.customer.name}</td>
                <td>{this.props.customer.email}</td>
                {/* <td>{this.props.obj.score}</td> */}
                {/* <td>{this.props.obj.categories}</td> */}
                <td>
                    <Link className="edit-link" to={"/customer-profile/" + this.props.customer._id}>
                        View
                    </Link>
                    {/* <Button size="sm" variant="danger">
                        Delete
                    </Button> */}
                </td>
            </tr>
        );
    }
}
