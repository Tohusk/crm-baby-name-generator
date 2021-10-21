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
        // this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            allContacts: [],
            contactNames: [],
            allProducts: [],
            productNames: [],
            showContact: false,
            showProduct: false,
            contact: {},
            products: [],
            productsPurchased: [
                {
                    productId: "",
                    quantity: 1,
                    name: "",
                    price: 0,
                },
            ],
            total: 0,
            rating: 0,
            errorMessage: "",
        };
    }

    //get request for all contacts and products
    async componentDidMount() {
        try {
            let contacts = ContactService.getAllContacts(this.state.currentUser.id);
            let products = ProductService.getAllProducts(this.state.currentUser.id);
            let response = await Promise.all([contacts, products]);

            let contactResponse = response[0];
            let productResponse = response[1];

            const contactData = contactResponse.data;
            //putting contact and product names into an array of strings for autocomplete searchbox
            let contactNames = [];
            for (const contact of contactData) {
                contactNames.push(contact.name);
            }

            const productData = productResponse.data;
            let productNames = [];
            for (const product of productData) {
                productNames.push(product.name);
            }

            this.setState({
                contactNames: contactNames,
                productNames: productNames,
                contactId: "",
                allProducts: productResponse.data,
                allContacts: contactResponse.data,
            });
        } catch (err) {
            console.log(err);
        }
    }

    //set the contact selected from autocomplete searchbox component as state contact
    handleContactCallback = (childData) => {
        let { allContacts } = this.state;
        //console.log(allContacts);
        for (let k in allContacts) {
            //console.log(allContacts[k]);
            if (allContacts[k]["name"] === childData) {
                this.setState({ contact: allContacts[k] });
            }
        }

        //this.setState({contact: childData})
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
    };

    //Set products purchased
    handleSubmit = (childData) => {
        let databody = {
            contactId: this.state.contact,
            satisfactionRating: this.state.rating,
            total: this.state.total,
        };
    };

    onContactButtonClickHandler = () => {
        this.setState({ showContact: !this.state.showContact });
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
                        <div className="addTransaction-subtitle">Select Contact</div>
                        <AutoCompleteText items={this.state.contactNames} parentCallback={this.handleContactCallback} />
                    </div>
                    <div className="addTransaction-sub-container">
                        <div className="addTransaction-subtitle">Select Product/s</div>
                        <AutoCompleteText items={this.state.productnames} parentCallback={this.handleProductCallback} />
                        {this.state.errorMessage && <p className="addTransaction-error">{this.state.errorMessage}</p>}
                    </div>
                    <AddTransProductForm
                        selectedProducts={this.state.products}
                        contact={this.state.contact}
                        userId={this.state.currentUser.id}
                    ></AddTransProductForm>
                </div>
            </div>
        );
    }
}
