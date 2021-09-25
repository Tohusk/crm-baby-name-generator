import React, { Component } from "react";
import CategoryService from "../services/category.service";
import "../styles/AddItem.css";

export default class CategoryTableRow extends Component {
    constructor(props) {
        super(props);
        this.deleteOneCategory = this.deleteOneCategory.bind(this);
    }

    
    async deleteOneCategory() {
        try {
            const res = await CategoryService.deleteCategory(
                this.props.currentUser.id, 
                this.props.category._id
            );
            window.location.reload();
        } catch (err) {
            alert("Error deleting category")
        }
    }

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
                <td>
                    <button className="addCategory-delete" onClick={this.deleteOneCategory}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" fillRule="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                    </button>
                </td>
            </tr>
        );
    }
}
