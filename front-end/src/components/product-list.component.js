import React, { Component } from "react";
import UserService from "../services/user.service";
import Table from "react-bootstrap/Table";
import ProductTableRow from "./product-table-row.component";
import ProductService from "../services/product.service";

import "../styles/Overview.css";

export default class ProductList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: UserService.getCurrentUser(),
            products: [],
        };
    }

    async componentDidMount() {
        try {
            const res = await ProductService.getAllProducts(this.state.currentUser.id);
            this.setState({
                products: res.data,
            });
        } catch (err) {
            alert(err);
        }
    }

    displayTable() {
        return this.state.products.map((currentProduct, i) => {
            return <ProductTableRow product={currentProduct} key={i} id={i + 1} />;
        });
    }

    render() {
        return (
            <div className="overview-table-wrapper">
                {this.state.products.length === 0 ? (
                    <div className="overview-no-data-title">No Products Found</div>
                ) : (
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>{this.displayTable()}</tbody>
                    </Table>
                )}
            </div>
        );
    }
}
