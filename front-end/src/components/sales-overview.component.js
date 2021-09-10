import React, { Component } from "react";
import AuthService from "../services/auth.service";
import axios from "axios";
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

import "../styles/Home.css";
import "../styles/customers.css"
import Sidebar from "./sidebar.component";

export default class Sales extends Component {
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
            Sales
        </div>
        <div className="button-box">
        <Link
            to="/add-product"
            className="add-btn"
            // style={{ textDecoration: "none" }}
        >
            + Add Product
        </Link>
        </div>
        <div className="subheading">
                Overview
            </div>
        <div className="flex-container" >
            <div className="stats-card" > 
                <div className="card-heading">Number of Sales</div>
                <div className="card-stat">20</div>
            </div>
            <div className="stats-card" > 
                <div className="card-heading">Overall Revenue</div>
                <div className="card-stat">$20300</div>
            </div>
            <div className="stats-card"> 
                <div className="card-heading">Average Revenue</div>
                <div className="card-stat">$6200</div>
            </div>
        </div>
        <div className="subheading">
                Recent Transaction History
            </div>

        <div className="flex-container" >
        <div className="table-wrapper">
              <Table bordered hover>
                  <thead>
                      <tr>
                          <th>ID</th>
                          <th>Date</th>
                          <th>Customer Name</th>
                          <th>Total</th>
                          
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>1</td>
                          <td>01/02/2020 4:15PM</td>
                          <td>Tom Smith</td>
                          <td>$60.00</td>
                          
                      </tr>
                      <tr>
                          <td>2</td>
                          <td>01/02/2020 7:15PM</td>
                          <td>Mark Otto</td>
                          <td>$10.50</td>
                          
                      </tr>
                  </tbody>
              </Table>
             
            
    
          </div>
        </div>


        

      </div>

    );
  }
}