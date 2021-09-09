import React, { Component } from "react";
import AuthService from "../services/auth.service";
import axios from "axios";
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

import "../styles/Home.css";
import "../styles/customers.css"
import Sidebar from "./sidebar.component";

export default class Customers extends Component {
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
            Customers
        </div>
        <div className="button-box">
        <Link
            to="/addcustomer"
            className="add-btn"
            // style={{ textDecoration: "none" }}
        >
            + Add Customer
        </Link>
        </div>
        <div className="subheading">
                Overview
            </div>
        <div className="flex-container" >
            <div className="stats-card" > 
                <div className="card-heading">Total Customers</div>
                <div className="card-stat">20</div>
            </div>
            <div className="stats-card" > 
                <div className="card-heading">Satisfaction Score {'>'} 4.0</div>
                <div className="card-stat">51%</div>
            </div>
            <div className="stats-card"> 
                <div className="card-heading">Number of Customers (graph)</div>
            </div>
        </div>
        <div className="subheading">
                Customer List
            </div>

        <div className="flex-container" >
        <div className="table-wrapper">
              <Table bordered hover>
                  <thead>
                      <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Satisfaction Score</th>
                          <th>Preferred Categories</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>1</td>
                          <td>Mark Otto</td>
                          <td>otto123@example.com</td>
                          <td>4.0</td>
                          <td>Fruit, Vegetable, Dairy</td>
                      </tr>
                      <tr>
                          <td>2</td>
                          <td>Bob The Bird</td>
                          <td>bobbird@example.com</td>
                          <td>4.5</td>
                          <td>Bread, Fruit, Dairy</td>
                      </tr>
                  </tbody>
              </Table>
             
            
    
          </div>
        </div>


        

      </div>

    );
  }
}