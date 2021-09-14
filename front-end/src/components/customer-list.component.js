import React, { Component } from "react";
import AuthService from "../services/auth.service";
import axios from "axios";
import Table from "react-bootstrap/Table";
import CustomerTableRow from "./customer-table-row.component";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

// const showCustomers = (props) => (
//     <tr>
//         <td>{props.customer._id}</td>
//         <td>{props.customer.name}</td>
//         <td>{props.customer.email}</td>
//                 {/* <td>{this.props.obj.score}</td> */}
//                 {/* <td>{this.props.obj.categories}</td> */}
//         <td>
//             <Link className="edit-link" to={"/edit-customer/" + props.customer._id}>
//                 Edit
//             </Link>
//             {/* <Button size="sm" variant="danger">
//                 Delete
//             </Button> */}
//         </td>
//     </tr>
// );



export default class CustomerList extends Component {
    constructor(props) {
        super(props);

        this.state = {
          currentUser: AuthService.getCurrentUser(),
          customers: []
        };
      }
    
    componentDidMount(){
        axios.get("http://localhost:8080/api/contact/getAll?userId=6137539b9ea0762ce0a1f560")
        .then(res => {
            this.setState({
                customers: res.data
                
                // customer_id: res.data.customers._id,
                // customer_name: res.data.customers.name,
                // customer_email: res.data.customers.email,
            });
            console.log(res.data);
            console.log(res.data._id);
            
            //console.log(res.data.customers);
        })
        .catch((error) => {
            console.log(error);
            console.log(this.state.currentUser._id);
        })
    }

    // dataTable(){
    //     return this.state.customers.map((res, i) => {
    //         return <CustomerTableRow obj={res} key={i} />;
    //     });
    // }
    
    displayTable(){
        return this.state.customers.map((currentcustomer, i) => {
            return (
                <CustomerTableRow
                    customer={currentcustomer}
                    key={i}
                />
            );
        });
    }

      render() {
    
        return (
          <div className="table-wrapper">
              <Table bordered hover>
                  <thead>
                      <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          {/* <th>Satisfaction Score</th>
                          <th>Preferred Categories</th> */}
                      </tr>
                  </thead>
                  <tbody>
                      {this.displayTable()}
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
