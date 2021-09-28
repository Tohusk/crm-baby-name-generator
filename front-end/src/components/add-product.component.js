import React, { Component } from "react";
import AuthService from "../services/auth.service";
// import Input from "react-validation/build/input";
import { Form } from "react-bootstrap";

import "../styles/AddItem.css";

export default class AddProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
        };
    }

    render() {
        return (
            <div className="addItem-container">
                {/*Page Name*/}
                <div className="addItem-title">Add Product</div>
                {/* One form for submitting add product query */}

                <Form>
                    <div className="addProduct-form">
                        <div className="addProduct-text-fields">
                            <Form.Group className="addProduct-form-group" controlId="formBasicName">
                                <Form.Label>NAME</Form.Label>
                                <Form.Control className="form-control" type="name" />
                            </Form.Group>

                            <Form.Group className="addProduct-form-group" controlId="formBasicPrice">
                                <Form.Label>PRICE</Form.Label>
                                <Form.Control className="form-control" type="price" />
                            </Form.Group>
                        </div>

                        <div className="addProduct-radio-fields">
                            <div className="addProduct-category-title">CATEGORY</div>

                            <Form.Check className="addProduct-radio-categories" type="Radio" label="Fruit" />
                            <Form.Check className="addProduct-radio-categories" type="Radio" label="Vegetable" />
                            <Form.Check className="addProduct-radio-categories" type="Radio" label="Bread" />
                            <Form.Check className="addProduct-radio-categories" type="Radio" label="Dairy" />
                            <div className="addProduct-addCategory-container">
                                <a className="addProduct-addCategory" href="/addCategory">
                                    + Add Category
                                </a>
                            </div>
                        </div>

                        <div className="addProduct-submit-group">
                            <a className="addProduct-cancelButton" href="/home">
                                Cancel
                            </a>
                            <button className="submitButton">Add</button>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}
