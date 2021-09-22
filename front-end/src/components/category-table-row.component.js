import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default class CategoryTableRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.category.name}</td>
                <td>{this.props.category.colour}</td>
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
