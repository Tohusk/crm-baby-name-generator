import React, { Component } from "react";

export default class CategoryTableRow extends Component {
    render() {
        return (
            <tr>
                <td className >{this.props.category.name}</td>
            </tr>
        );
    }
}
