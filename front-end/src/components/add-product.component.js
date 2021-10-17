import React, { Component } from "react";
import AuthService from "../services/auth.service";
import { withRouter } from "react-router";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import "../styles/AddItem.css";
import CategoryService from "../services/category.service";
import ProductService from "../services/product.service";
import { Redirect } from "react-router";

// If argument is empty, then return a div bar warning message
const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeCategoryId = this.onChangeCategoryId.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            categories: [],
            name: "",
            price: "",
            categoryId: null,
            message: "",
            loading: false,
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value,
        });
    }

    onChangePrice(e) {
        this.setState({
            price: e.target.value,
        });
    }

    onChangeCategoryId(e) {
        this.setState({
            categoryId: e.target.value,
        });
    }

    async componentDidMount() {
        // Load categories into state
        try {
            const res = await CategoryService.getAllCategories(this.state.currentUser.id);
            this.setState({
                categories: res.data,
            });
        } catch (err) {
            //do not alert for user experience
            //alert(err);
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true,
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            try {
                const res = await ProductService.addNewProduct(
                    this.state.name,
                    this.state.price,
                    this.state.categoryId,
                    this.state.currentUser.id
                );
                // Give success message
                this.setState({
                    message: res.data.message,
                    loading: false,
                });
                this.props.history.push("/products");
            } catch (err) {
                const resMessage =
                    (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
                this.setState({
                    message: resMessage,
                    loading: false,
                });
            }
        } else {
            this.setState({
                loading: false,
            });
        }
    }

    render() {
        if (AuthService.getCurrentUser() == null) {
            alert("Please login first.");

            return <Redirect to={{ pathname: "/login" }} />;
        }
        return (
            <div className="addItem-container">
                <div className="addItem-title">Add Product</div>
                {/* One form for submitting add product query */}
                <Form
                    className="addProduct-form"
                    onSubmit={this.handleSubmit}
                    ref={(c) => {
                        this.form = c;
                    }}
                >
                    <div className="addProduct-text-fields">
                        <label htmlFor="name">NAME</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChangeName}
                            validations={[required]}
                        />

                        <label htmlFor="price">PRICE</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="price"
                            value={this.state.price}
                            onChange={this.onChangePrice}
                            validations={[required]}
                        />
                    </div>

                    <div className="addProduct-radio-fields">
                        <div className="addProduct-category-title">CATEGORY</div>
                        {/* Loop over categories for radio button options */}
                        {this.state.categories.map((category, i) => {
                            return (
                                <div className="addProduct-radio-categories" key={i}>
                                    <Input
                                        type="radio"
                                        value={category._id}
                                        name="category"
                                        onChange={this.onChangeCategoryId}
                                        validations={[required]}
                                    />
                                    <label htmlFor="category">{category.name}</label>
                                </div>
                            );
                        })}

                        <div className="addProduct-addCategory-container">
                            <a className="addProduct-addCategory" href="/addCategory">
                                + Add Category
                            </a>
                        </div>
                    </div>

                    <div className="addProduct-submit-group">
                        <a className="addProduct-cancelButton" href="/products">
                            Cancel
                        </a>
                        <button className="submitButton" disabled={this.state.loading}>
                            {this.state.loading && <span className="spinner-border spinner-border-sm"></span>}
                            Add
                        </button>
                    </div>

                    <CheckButton
                        style={{ display: "none" }}
                        ref={(c) => {
                            this.checkBtn = c;
                        }}
                    />
                </Form>

                {this.state.message && (
                    <div className="authentication-form-group">
                        <div className="alert alert-danger" role="alert">
                            {this.state.message}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(AddProduct);
