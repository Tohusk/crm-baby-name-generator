import React, { Component } from "react";
import AuthService from "../services/auth.service";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";


import CategoryService from "../services/category.service";
import "../styles/AddItem.css";
import CategoryList from "./category-list.component";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export default class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeColour= this.onChangeColour.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showAddForm = this.showAddForm.bind(this);
        this.state = {
            currentUser: AuthService.getCurrentUser(),
            message: "",
            loading: false,
            showAddForm: false,
            name: "",
            colour: "#000000"
        };
    }

    showAddForm() {
        this.setState({
            showAddForm: true,
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
                    loading: false
                });

                window.location.reload();
            } catch (err) {
                const resMessage =
                (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
                this.setState({
                    message: resMessage,
                    loading: false
                });
            }
        } else {
            this.setState({
                loading: false
            });
        }
    }


    render() {
        return (
            <div className="addItem-container">
                <div className="addItem-title">Edit Categories</div>
                <div className="addCategory-list-container">
                    <p>CATEGORIES</p>
                    <div className="overview-flex-container">
                        <CategoryList />
                    </div>

                    { this.state.showAddForm ? 
                    <Form className="addCategory-form" 
                    onSubmit={this.handleSubmit}
                    ref={(c) => {
                        this.form = c;
                    }}
                    >
                    <div className="addCategory-form-group">
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
                            name= "colour"
                            value={this.state.colour}
                            onChange={this.onChangeColour}
                            validations={[required]}
                        />
                    </div>
                    <div className="addCategory-submit-group">
                    <a className="addCategory-cancelButton" href="/home">
                        Cancel
                    </a>
                    <button className="submitButton" disabled={this.state.loading}>
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
                : null }
                    
                    <button onClick={this.showAddForm} className="addCategory-addCategory">+ Add Category</button>
                </div>
                
            </div>
        );
    }
}
