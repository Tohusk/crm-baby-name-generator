import React, { Component } from "react";

export default class CategoryTableRow extends Component {
    render() {
        let styles = {};
        const colour = this.props.category.colour;
        styles = {
            background: colour
        };

        return (
            <tr>
                <td style={styles}></td>
                <td>{this.props.category.name}</td>
            </tr>
        );
    }
}
