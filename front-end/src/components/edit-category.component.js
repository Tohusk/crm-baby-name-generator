import React, { Component } from "react";
import UserService from "../services/user.service";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import CategoryService from "../services/category.service";
import "../styles/AddItem.css";
import CategoryList from "./category-list.component";
import { Redirect } from "react-router";
import { useHistory } from "react-router";

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

//Back button to go back to the previous page from history
export const BackButton = () => {
    let history = useHistory();
    return (
        <button className="editCategory-backButton" onClick={() => history.goBack()}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-left-short"
                viewBox="0 0 16 16"
            >
            <path
                fillRule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
            />
            </svg>
            Back
        </button>
    );
};

export default class EditCategory extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeColour = this.onChangeColour.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showAddForm = this.showAddForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
        this.handleBack = this.handleBack.bind(this);

        this.state = {
            currentUser: UserService.getCurrentUser(),
            message: "",
            loading: false,
            showAddForm: false,
            name: "",
            colour: "#000000",
        };
    }

    handleBack() {
        this.props.history.goBack();
    }

    showAddForm() {
        this.setState({
            showAddForm: true,
        });
    }

    hideForm() {
        this.setState({
            showAddForm: false,
        });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value,
        });
    }

    onChangeColour(e) {
        this.setState({
            colour: e.target.value,
        });
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
                const res = await CategoryService.addNewCategory(
                    this.state.name,
                    this.state.colour,
                    this.state.currentUser.id
                );
                
                // Give success message
                this.setState({
                    message: res.data.message,
                    loading: false,
                });

                // Refresh the category list (probs better way by rerendering individual component)
                window.location.reload();
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
        if (UserService.getCurrentUser() == null) {
            alert("Please login first.");

            return <Redirect to={{ pathname: "/login" }} />;
        }
        return (
            <div className="addItem-container">
                <div className="editCategory-smallText">
                    <BackButton></BackButton>
                </div>
                <div className="addItem-title">Edit Categories</div>
                <div className="editCategory-list-container">
                    <p>CATEGORIES</p>
                    <div className="overview-flex-container">
                        <CategoryList />
                    </div>

                    {this.state.showAddForm ? (
                        <Form
                            className="editCategory-form"
                            onSubmit={this.handleSubmit}
                            ref={(c) => {
                                this.form = c;
                            }}
                        >
                            <div className="editCategory-form-group">
                                <label htmlFor="name">NAME</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChangeName}
                                    validations={[required]}
                                />
                                <label htmlFor="colour">Colour</label>
                                <Input
                                    type="color"
                                    className="form-control"
                                    name="colour"
                                    value={this.state.colour}
                                    onChange={this.onChangeColour}
                                    validations={[required]}
                                />
                            </div>
                            <div className="editCategory-submit-group">
                                <button onClick={this.hideForm} className="editCategory-cancelButton" href="/home">
                                    Cancel
                                </button>
                                <button className="submitButton" disabled={this.state.loading}>
                                    {this.state.loading && <span className="spinner-border spinner-border-sm"></span>}
                                    Add
                                </button>
                            </div>

                            {this.state.message && (
                                <div className="authentication-form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {this.state.message}
                                    </div>
                                </div>
                            )}

                            <CheckButton
                                style={{ display: "none" }}
                                ref={(c) => {
                                    this.checkBtn = c;
                                }}
                            />
                        </Form>
                    ) : null}

                    <button onClick={this.showAddForm} className="editCategory-editCategory">
                        + Add Category
                    </button>
                </div>
            </div>
        );
    }
}
