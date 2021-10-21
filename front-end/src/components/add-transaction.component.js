import React, { Component } from "react";
import AuthService from "../services/auth.service";
import axios from "axios";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AutoCompleteText from "./search-autocomplete.component";
import AddTransProductForm from "./add-trans-products.component";
import ContactService from "../services/contact.service";
import ProductService from "../services/product.service";

import "../styles/AddItem.css";
import { Redirect } from "react-router";

export default class AddTransaction extends Component {
    constructor(props) {
        super(props);
        // this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            allCustomers: [],
            customernames: [],
            allProducts: [],
            productnames: [],
            showCustomer: false,
            showProduct: false,
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
            rating: 0,
            total: 0,
            //custName: {},
            // products: [{
            //   productId: "",
            //   quantity: 0,
            //   name: "",
            //   price: 0,
            // }]
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

        //this.setState({customer: childData})
    };

    //set the product selected from autocomplete searchbox component as state product
    handleProductCallback = (childData) => {
        let { allProducts } = this.state;
        console.log(this.state.products);
        for (let k in allProducts) {
            console.log(allProducts[k]);
            if (allProducts[k]["name"] === childData) {
                console.log("matched");
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

        // this.setState({ products: [...this.state.products.productId, childData] })
    };

    //Set products purchased
    handleSubmit = (childData) => {
        let databody = {
            contactId: this.state.customer,
            satisfactionRating: this.state.rating,
            total: this.state.total,
        };
    };

    onCustomerButtonClickHandler = () => {
        this.setState({ showCustomer: !this.state.showCustomer });
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
                    {/*Page Name*/}

                    {/* <div className="addTransaction-container">  */}
                    {/* <div className="addTransaction-form"> */}

                    <div className="addTransaction-sub-container">
                        <div className="addTransaction-subtitle">Select Customer</div>
                        <AutoCompleteText
                            items={this.state.customernames}
                            parentCallback={this.handleCustomerCallback}
                        />
                        {/* <button className="addTransaction-add-button" onClick={this.onCustomerButtonClickHandler}>
              <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
              </svg>
              Add
            </button> */}
                    </div>
                    <div className="addTransaction-sub-container">
                        <div className="addTransaction-subtitle">Select Product/s</div>
                        <AutoCompleteText items={this.state.productnames} parentCallback={this.handleProductCallback} />
                        {/* <button className="addTransaction-add-button">Add</button> */}
                    </div>
                    {/* <Form> */}
                    {/* <div className="addTransaction-sub-container">
            <div className="addTransaction-subtitle">Customer:</div>
            <p>{this.state.customer['name']}</p>
            
          </div> */}
                    {/* <div className="addTransaction-sub-container">
            <div className="addTransaction-subtitle">Product/s:</div> */}

                    {/* <AddTransProductForm selectedProducts={this.state.products}></AddTransProductForm> */}
                    <AddTransProductForm
                        selectedProducts={this.state.products}
                        customer={this.state.customer}
                        userId={this.state.currentUser.id}
                    ></AddTransProductForm>

                    {/* </div> */}
                </div>
            </div>
        );
    }
}
