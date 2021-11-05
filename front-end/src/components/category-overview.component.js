import React, { Component } from "react";
import UserService from "../services/user.service";
import CategoryService from "../services/category.service";

export default class CategoryOverview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: UserService.getCurrentUser(),
            categories: [],
        };
    }

    displayCategories() {
        if (this.state.categories.length === 0) {
            return <div>No categories to show</div>;
        }
        return this.state.categories.map((currentCategory) => {
            return (
                <div
                    key={currentCategory.id}
                    className="category-containerTag"
                    style={{ background: currentCategory.colour }}
                >
                    {currentCategory.name}
                </div>
            );
        });
    }

    async componentDidMount() {
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

    render() {
        return <div className="category-containerProductOverview">{this.displayCategories()}</div>;
    }
}
