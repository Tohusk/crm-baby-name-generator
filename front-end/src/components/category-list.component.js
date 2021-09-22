import React, { Component } from "react";
import AuthService from "../services/auth.service";
import Table from "react-bootstrap/Table";
import CategoryService from "../services/category.service";

import "../styles/Overview.css";
import CategoryTableRow from "./category-table-row.component";

export default class CategoryList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            categories: null,
        };
    }

    async componentDidMount() {
        try {
            const res = await CategoryService.getAllCategories(this.state.currentUser.id);
            this.setState({
                categories: res.data,
            });
            console.log(res.data);
        } catch (err) {
            this.setState({
                categories: null,
            });
        }
    }

    displayTable() {
        if (this.state.categories === null) {
            return <h1>No categories to show</h1>;
        }
        return this.state.categories.map((currentCategory, i) => {
            return <CategoryTableRow category={currentCategory} key={i} />;
        });
    }

    render() {
        return (
            <div className="overview-table-wrapper">
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>Category Name</th>
                        </tr>
                    </thead>
                    <tbody>{this.displayTable()}</tbody>
                </Table>
            </div>
        );
    }
}
