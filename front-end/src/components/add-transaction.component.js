import React, { Component } from "react";
import AuthService from "../services/auth.service";
import AutoCompleteText from "./search-autocomplete.component";
import AddTransProductForm from "./add-trans-products.component";
import ContactService from "../services/contact.service";
import ProductService from "../services/product.service";

import "../styles/AddItem.css";
import { Redirect } from "react-router";

export default class AddTransaction extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            allCustomers: [],
            customernames: [],
            allProducts: [],
            productnames: [],
            customer: {},
            products: [],
            productsPurchased: [
                {
                    productId: "",
                    quantity: 1,
                    name: "",
                    price: 0,
                },
            ],
        };
    }

    //get request for all customers and products
    async componentDidMount() {
        try {
            let customers = ContactService.getAllCustomers(this.state.currentUser.id);
            let products = ProductService.getAllProducts(this.state.currentUser.id);
            let response = await Promise.all([customers, products]);

            let customerResponse = response[0];
            let productResponse = response[1];

            const custData = customerResponse.data;
            //putting customer and product names into an array of strings for autocomplete searchbox
            let custNames = [];
            for (const customer of custData) {
                custNames.push(customer.name);
            }

            const prodData = productResponse.data;
            let prodNames = [];
            for (const product of prodData) {
                prodNames.push(product.name);
            }

            this.setState({
                customernames: custNames,
                productnames: prodNames,
                customerId: "",
                allProducts: productResponse.data,
                allCustomers: customerResponse.data,
            });
        } catch (err) {
            console.log(err);
        }
    }

    //set the customer selected from autocomplete searchbox component as state customer
    handleCustomerCallback = (childData) => {
        let { allCustomers } = this.state;
        //console.log(allCustomers);
        for (let k in allCustomers) {
            //console.log(allCustomers[k]);
            if (allCustomers[k]["name"] === childData) {
                this.setState({ customer: allCustomers[k] });
            }
        }
    };

    //set the product selected from autocomplete searchbox component as state product
    handleProductCallback = (childData) => {
        let { allProducts } = this.state;
        console.log(this.state.products);

        for (let k in allProducts) {
            //console.log(allProducts[k]);
            if (allProducts[k]["name"] === childData) {
                //console.log("matched");
                console.log(allProducts[k]);
                this.setState((prevState) => ({
                    products: [...prevState.products, allProducts[k]],
                }));

                const item = {
                    productId: allProducts[k]["_id"],
                    quantity: 1,
                    name: allProducts[k]["name"],
                    price: allProducts[k]["price"],
                };
                this.setState((prevState) => ({
                    productsPurchased: [...prevState.productsPurchased, item],
                }));
            }
        }
        console.log(this.state.products);
    };

    render() {
        if (AuthService.getCurrentUser() == null) {
            alert("Please login first.");

            return <Redirect to={{ pathname: "/login" }} />;
        }
        return (
            <div>
                <div className="addItem-title">New Transaction</div>
                <div className="addTransaction-container">
                    <div className="addTransaction-sub-container">
                        <div className="addTransaction-subtitle">Select Customer</div>
                        <AutoCompleteText
                            items={this.state.customernames}
                            parentCallback={this.handleCustomerCallback}
                        />
                    </div>
                    <div className="addTransaction-sub-container">
                        <div className="addTransaction-subtitle">Select Product/s</div>
                        <AutoCompleteText items={this.state.productnames} parentCallback={this.handleProductCallback} />
                    </div>
                    <AddTransProductForm
                        selectedProducts={this.state.products}
                        customer={this.state.customer}
                        userId={this.state.currentUser.id}
                    ></AddTransProductForm>
                </div>
            </div>
        );
    }
}
