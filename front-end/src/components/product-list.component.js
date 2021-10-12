import React, { Component } from "react";
import AuthService from "../services/auth.service";
import Table from "react-bootstrap/Table";
import ProductTableRow from "./product-table-row.component";
import { Link } from "react-router-dom";
import ProductService from "../services/product.service";


import "../styles/Overview.css";

export default class ProductList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            products: [],
        };
    }

    async componentDidMount() {
        try {
            const res = await ProductService.getAllProducts(this.state.currentUser.id);
            this.setState({
                products: res.data,
            });
        }
        catch (err) {
            alert(err);
        }
    }

    displayTable() {
        return this.state.products.map((currentProduct, i) => {
            return <ProductTableRow customer={currentProduct} key={i} id={i+1}/>;
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
                            {/* <th>Satisfaction Score</th>
                          <th>Preferred Categories</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {this.displayTable()}
                    </tbody>
                </Table>
            </div>
        );
    }
}
