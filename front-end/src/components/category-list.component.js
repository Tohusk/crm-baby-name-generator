import React, { Component } from "react";
import UserService from "../services/user.service";
import Table from "react-bootstrap/Table";
import CategoryService from "../services/category.service";

import "../styles/Overview.css";
import CategoryTableRow from "./category-table-row.component";

export default class CategoryList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: UserService.getCurrentUser(),
            categories: [],
        };
    }

    async componentDidMount() {
        // Load all categories into the state
        try {
            const res = await CategoryService.getAllCategories(this.state.currentUser.id);
            this.setState({
                categories: res.data,
            });
        } catch (err) {
            this.setState({
                categories: [],
            });
        }
    }

    displayTable() {
        if (this.state.categories.length === 0) {
            return <div>No categories found</div>;
        }
        // Using categories in state, render a row for every category
        return this.state.categories.map((currentCategory, i) => {
            return <CategoryTableRow currentUser={this.state.currentUser} category={currentCategory} key={i} />;
        });
    }

    render() {
        return (
            <div className="overview-table-wrapper">
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Category Name</th>
                        </tr>
                    </thead>
                    <tbody>{this.displayTable()}</tbody>
                </Table>
            </div>
        );
    }
}
