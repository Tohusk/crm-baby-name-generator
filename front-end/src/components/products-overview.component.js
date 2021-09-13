import React, { Component } from "react";
import AuthService from "../services/auth.service";
import axios from "axios";
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

import "../styles/Home.css";
import "../styles/customers.css"
import Sidebar from "./sidebar.component";

export default class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  render() {

    return (
      <div >
          <Sidebar/>
        {/*Page Name*/}
        
            <div className = "pagename">
                Products
            </div>
            {/* <div className="break"></div> */}
            <div className="button-box">
                <Link
                    to="/add-product"
                    className="add-btn"
                    // style={{ textDecoration: "none" }}
                >
                    + Add Product
                </Link>
            </div>
        {/* <break></break> */}
            <div className="subheading">
                Overview
            </div>
            <div className="flex-container" >
                <div className="stats-card" > 
                    <div className="card-heading">Total Products</div>
                    <div className="card-stat">20</div>
                </div>
                <div className="stats-card" > 
                    <div className="card-heading">Top Product of the Week</div>
                    <div className="card-stat">Apples (500g)</div>
                </div>
                <div className="stats-card"> 
                    <div className="card-heading">Products by Categories (chart)</div>
                </div>
            </div>
            <div className="subheading">
                Product List
            </div>

        <div className="flex-container" >
        <div className="table-wrapper">
              <Table bordered hover>
                  <thead>
                      <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Category</th>
                          
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>1</td>
                          <td>Apples (500g)</td>
                          <td>$5.00</td>
                          <td>Fruit</td>
                          
                      </tr>
                      <tr>
                          <td>2</td>
                          <td>Bananas (500g)</td>
                          <td>$4.50</td>
                          <td>Fruit</td>
                          
                      </tr>
                  </tbody>
              </Table>
             
            
    
          </div>
        </div>

      </div>

    );
  }
}