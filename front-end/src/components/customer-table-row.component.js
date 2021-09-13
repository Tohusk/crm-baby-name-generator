import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default class CustomerTableRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.obj._id}</td>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.email}</td>
                <td>{this.props.obj.score}</td>
                <td>{this.props.obj.categories}</td>
                <td>
                    <Link className="edit-link" to={"/edit-student/" + this.props.obj._id}>
                        Edit
                    </Link>
                    <Button size="sm" variant="danger">
                        Delete
                    </Button>
                </td>
            </tr>
        );
    }
}
