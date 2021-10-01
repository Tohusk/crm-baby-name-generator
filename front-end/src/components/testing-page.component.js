import React, { Component } from "react";
import AuthService from "../services/auth.service";
import CategoryService from "../services/category.service";
import ContactService from "../services/contact.service";
import ProductService from "../services/product.service";

export default class TestingPage extends Component {
    constructor(props) {
        super(props);
        this.testAuth = this.testAuth.bind(this);
        this.testCategory = this.testCategory.bind(this);
        this.testContact = this.testContact.bind(this);
        this.testProduct = this.testProduct.bind(this);


        this.state = {
            // Define testing data
            userName: "John Smith",
            userEmail: "john@smith.com",
            userCompanyName: "Johnny's Burgers",
            userPassword: "gamers",

            loggedInUser: "",

            categoryName: "Food",
            categoryColour: "#000000",
            categoryId: "",

            contactName: "Billie Jean",
            contactEmail: "billie@jean.com",
            contactPhoneNumber: "0400000000",
            contactCompanyName: "Propane and Propane Accessories",
            contactDescription: "Not Michael Jackson's lover",
            contactId: "",
        };
    }

    async testAuth() {
        try {
            console.log("Signing up")
            const res = await AuthService.register(this.state.userName, this.state.userEmail, this.state.userCompanyName, this.state.userPassword);
            console.log(res.data.message);
        } catch (err) {
            const resMessage =
            (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
            console.log(resMessage);
        }

        try {
            console.log("Logging in")
            await AuthService.login(this.state.userEmail, this.state.userPassword);
            console.log("Logged In");
            this.setState({
                loggedInUser: AuthService.getCurrentUser(),
            });
        } catch (err) {
            const resMessage =
            (err.response && err.response.data && err.response.data.message) || err.message || err.toString();

            console.log(resMessage);
        }
    }

    async testCategory() {
        try {
            console.log("Adding category")
            await AuthService.login(this.state.userEmail, this.state.userPassword);
            console.log("Logged In");
            this.setState({
                loggedInUser: AuthService.getCurrentUser(),
            });

            const res = await CategoryService.addNewCategory(
                this.state.categoryName,
                this.state.categoryColour,
                this.state.loggedInUser.id
            );
            // Give success message
            console.log(res.data.message);
        } catch (err) {
            const resMessage =
            (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
            console.log(resMessage);
        }

        try {
            console.log("Getting all categories")
            const res = await CategoryService.getAllCategories(this.state.loggedInUser.id);
            this.setState({
                categoryId: res.data[0]._id,
            });
            console.log(res.data);
        } catch (err) {
            const resMessage =
            (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
            console.log(resMessage);
        }

        try {
            console.log("Deleting category")
            const res = await CategoryService.deleteCategory(this.state.loggedInUser.id, this.state.categoryId);
            console.log(res.data.message);
        } catch (err) {
            const resMessage =
            (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
            console.log(resMessage);
        }

    }

    async testContact() {
        try {
            console.log("Adding contact")
            await AuthService.login(this.state.userEmail, this.state.userPassword);
            console.log("Logged In");
            this.setState({
                loggedInUser: AuthService.getCurrentUser(),
            });

            const res = await ContactService.addNewCustomer(
                this.state.contactName, 
                this.state.contactEmail, 
                this.state.contactPhoneNumber, 
                this.state.contactCompanyName, 
                this.state.contactDescription, 
                this.state.loggedInUser.id
            );
            console.log(res.data.message);
        } catch (err) {
            const resMessage =
            (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
            console.log(resMessage);
        }

        try {
            console.log("Getting all contacts")
            const res = await ContactService.getAllCustomers(this.state.loggedInUser.id);
            this.setState({
                contactId: res.data[0]._id,
            });
            console.log(res.data);
        } catch (err) {
            const resMessage =
            (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
            console.log(resMessage);
        }

        try {
            console.log("Getting single contact")
            const res = await ContactService.getOneCustomer(this.state.loggedInUser.id, this.state.contactId);
            console.log(res.data);
        } catch (err) {
            const resMessage =
            (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
            console.log(resMessage);
        }

        //TODO: Need deleting category
    }

    async testProduct() {
        try {
            console.log("Adding product")
            await AuthService.login(this.state.userEmail, this.state.userPassword);
            console.log("Logged In");
            this.setState({
                loggedInUser: AuthService.getCurrentUser(),
            });

            // const res = await ProductService.addNewCustomer(
            //     this.state.contactName, 
            //     this.state.contactEmail, 
            //     this.state.contactPhoneNumber, 
            //     this.state.contactCompanyName, 
            //     this.state.contactDescription, 
            //     this.state.loggedInUser.id
            // );
            // console.log(res.data.message);


        } catch (err) {

        }
    }
        
    render() {
        return (
            <div>
            <h1>Auth Service</h1>
            <button onClick={this.testAuth}>Test</button>
            <h1>Category Service</h1>
            <button onClick={this.testCategory}>Test</button>
            <h1>Contact Service</h1>
            <button onClick={this.testContact}>Test</button>
            <h1>Product Service</h1>
            <button onClick={this.testProduct}>Test</button>
            <h1>Transaction Service</h1>
            <div>Not implemented yet</div>
            </div>
        );
    }
}
