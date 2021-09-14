import React, { Component } from "react";
import AuthService from "../services/auth.service";
import axios from "axios";
import Table from "react-bootstrap/Table";
import "../styles/Overview.css";


export default class CustomerList extends Component {
    constructor(props) {
        super(props);

        this.state = {
          currentUser: AuthService.getCurrentUser(),
          customers: []
        };
      }
    
    componentDidMount(){
        axios.get('')
        .then(res => {
            this.setState({
                customers: res.data
            });
        })
        .catch((error) => {
            console.log(error);
        })
    }

    dataTable(){
        return this.state.customers.map((res, i) => {
            return <CustomerTableRow obj={res} key={i} />;
        });
    }
    
      render() {
    
        return (
          <div className="overview-table-wrapper">
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
                      {this.dataTable()}
                      {/* <tr>
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
                      </tr> */}
                  </tbody>
              </Table>
             
            
    
          </div>
    
        );
    }
}
