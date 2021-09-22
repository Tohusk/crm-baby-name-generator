import React, { Component } from "react";
import AuthService from "../services/auth.service";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import CategoryService from "../services/category.service";
import "../styles/AddItem.css";
import CategoryList from "./category-list.component";

export default class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        //this.onChangeColour= this.onChangeColour.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            currentUser: AuthService.getCurrentUser(),
            name: "",
            //colour: ""
        };
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

    async handleSubmit(event) {
        try {
            alert('A name was submitted: ' + this.state.name);
            alert('id was submitted: ' + this.state.currentUser.id);
            CategoryService.addNewCategory(
                this.state.name,
                //this.state.colour,
                this.state.currentUser.id
            );

            // const res = await CategoryService.addNewCategory(
            //     this.state.name,
            //     //this.state.colour,
            //     this.state.currentUser.id
            // );
        } catch (err) {
            alert(" err");
            const resMessage =
                (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        }
    }


    render() {
        return (
            <div className="addItem-container">
                {/*Page Name*/}
                <div className="addItem-title">Edit Categories</div>
                <div className="addCategory-list-container">
                    <h1>CATEGORIES</h1>
                    <div className="overview-flex-container">
                        <CategoryList />
                    </div>

                    <Form className="addCategory-form" onSubmit={this.handleSubmit}>
                    <div className="addCategory-form-group">
                        <label htmlFor="name">NAME</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChangeName}
                        />
                        {/* <Input
                            type="text"
                            className="form-control"
                            name= "colour"
                            value={this.state.colour}
                            onChange={this.onChangeColour}
                        /> */}
                    </div>
                    <div className="addCategory-submit-group">
                    <a className="addCategory-cancelButton" href="/home">
                        Cancel
                    </a>
                    {/* Add functionality to button to add category */}
                    {/* <button className="submitButton">Save</button> */}
                    <button className="submitButton" disabled={this.state.loading}>
                            Add
                    </button>
                </div>
                </Form>
                    {/* <ul className="addCategory-list">
                <li>Fruit
                    <button className="addCategory-deleteCategory">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </button>
                </li>
                <li>Vegetable
                    <button className="addCategory-deleteCategory">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </button>
                </li>
                <li>Bread
                    <button className="addCategory-deleteCategory">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </button>
                </li>
            </ul>  */}
                    {/* <button onclick = "addCategoryFunction()" className="addCategory-addCategory">+ Add Category</button> */}
                </div>
                
            </div>
        );
    }
}
