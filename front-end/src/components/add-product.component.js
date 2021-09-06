import React, { Component } from "react";
import AuthService from "../services/auth.service";

import "../styles/AddProduct.css";

export default class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  render() {

    return (
      <div className="addCustomer-container">
        {/*Page Name*/}
        <div className="addCustomer-title">Add Product</div>

        <form className="addCustomer-form">

          <div className="text-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input></input>
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input></input>
            </div>
          </div>

          <div className="category-radio">
          </div>

          <div className="addCustomer-submit-group">
            <a className="addCustomer-cancelButton" href = "/home">Cancel</a>
            <button className="addCustomer-addButton">Add</button>
          </div>  
        </form>


        

      </div>

    );
  }
}
