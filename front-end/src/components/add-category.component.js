import React, { Component } from "react";
import AuthService from "../services/auth.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import "../styles/AddItem.css";

const required = value => {
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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeBusinessName = this.onChangeBusinessName.bind(this);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      name: "",
      phoneNumber: "",
      email: "",
      description: "",
      businessName: "",
      loading: false,
      message: ""
    };
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
        this.setState({
          loading: false,
          message: "Not implemented"
        });

    }
    else {
      this.setState({
        loading: false
      });
    }
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  
  onChangePhoneNumber(e) {
    this.setState({
      phoneNumber: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  
  onChangeBusinessName(e) {
    this.setState({
      businessName: e.target.value
    });
  }


  render() {
    return (
      <div className="addItem-container">
        {/*Page Name*/}
        <div className="addItem-title">Edit Categories</div>
        <div className="addCategory-list-container">
            Categories
            <ul className="addCategory-list">
                {/* Probably add image of colour of category next to category name */}
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
            </ul> 
            <button className="addCategory-addCategory">+ Add Category</button>
        </div>
        <div className="addCategory-submit-group">
            <a className="addCategory-cancelButton" href="/home">Cancel</a>
            {/* Add functionality to button to add category */}
            <button
            className="submitButton"
            >
            Save
            </button>
        </div>

        
      </div>

    );
  }
}
