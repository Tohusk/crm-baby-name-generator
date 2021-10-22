import React, { Component } from "react";
import AuthService from "../services/auth.service";
import CategoryService from "../services/category.service";
import ContactService from "../services/contact.service";
import ProductService from "../services/product.service";
import TransactionService from "../services/transaction.service";


export default class TestingPage extends Component {
    constructor(props) {
        super(props);
        this.testAuth = this.testAuth.bind(this);
        this.testCategory = this.testCategory.bind(this);
        this.testContact = this.testContact.bind(this);
        this.testProduct = this.testProduct.bind(this);
        this.testTransaction = this.testTransaction.bind(this);


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

            contactUpdateName: "Kevin Joe",
            contactUpdateEmail: "Kevin@Joe.com",
            contactUpdatePhoneNumber: "0444444444",
            contactUpdateCompanyName: "Butane and Butane Accessories",
            contactUpdateDescription: "Michael Jackson's lover",

            productName: "Chicken Burger",
            productPrice: "5",
            productCategoryId: null,

            transactionRating: 5,
            transactionProductQuantity: 1,
            transactionId: "",
        };
    }

    // Need tests for signup, signin, update, delete
    async testAuth() {
        console.log("Testing Auth: ");
        try {
            console.log("Signing up");
            const res = await AuthService.register(
                this.state.userName,
                this.state.userEmail,
                this.state.userCompanyName,
                this.state.userPassword
            );
            console.log(res.data.message);
        } catch (err) {
            const resMessage =
                (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
            console.log(resMessage);
        }

        try {
            console.log("Logging in");
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

    // Need tests for new, update, get, getAll, delete
    async testCategory() {
        console.log("Testing Category: ");
        try {
            console.log("Adding category");
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
            console.log("Getting all categories");
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
            console.log("Getting single category");
            const res = await CategoryService.getOneCategory(this.state.loggedInUser.id, this.state.categoryId);
            console.log(res.data);
        } catch (err) {
            const resMessage =
                (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
            console.log(resMessage);
        }

        try {
            console.log("Deleting category");
            const res = await CategoryService.deleteCategory(this.state.loggedInUser.id, this.state.categoryId);
            console.log(res.data.message);
        } catch (err) {
            const resMessage =
                (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
            console.log(resMessage);
        }

    }

    // Need tests for new, update, get, getAll, delete
    async testContact() {
        console.log("Testing Contact: ");
        try {
            console.log("Adding contact");
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
            console.log("Getting all contacts");
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
            console.log("Getting single contact");
            const res = await ContactService.getOneCustomer(this.state.loggedInUser.id, this.state.contactId);
            console.log(res.data);
        } catch (err) {
            const resMessage =
                (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
            console.log(resMessage);
        }

        try {
            console.log("Updating contact");
            const res = await ContactService.updateCustomer(
                this.state.contactUpdateName,
                this.state.contactUpdateEmail,
                this.state.contactUpdatePhoneNumber,
                this.state.contactUpdateCompanyName,
                this.state.contactUpdateDescription,
                this.state.loggedInUser.id, 
                this.state.contactId);
            console.log(res.data.message);
        } catch (err) {
            const resMessage =
                (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
            console.log(resMessage);
        }

        try {
            console.log("Deleting contact");
            const res = await ContactService.deleteCustomer(
                this.state.loggedInUser.id, 
                this.state.contactId);
            console.log(res.data.message);
        } catch (err) {
            const resMessage =
                (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
            console.log(resMessage);
        }
    }

    // Need tests for new, update, get, getAll, delete
    async testProduct() {
        console.log("Testing Product: ");
        try {
            console.log("Adding product");
            await AuthService.login(this.state.userEmail, this.state.userPassword);
            console.log("Logged In");
            this.setState({
                loggedInUser: AuthService.getCurrentUser(),
            });

            const res = await ProductService.addNewProduct(
                this.state.productName,
                this.state.productPrice,
                this.state.productCategoryId,
                this.state.loggedInUser.id
            );
            console.log(res.data.message);
        } catch (err) {
            const resMessage =
                (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
            console.log(resMessage);
        }

        try {
            console.log("Getting all products");
            const res = await ProductService.getAllProducts(
                this.state.loggedInUser.id
            );
            console.log(res.data);
        } catch (err) {
            const resMessage =
                (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
            console.log(resMessage);
        }

        try {
            console.log("Deleting product");
            const getRes = await ProductService.getAllProducts(
                this.state.loggedInUser.id
            );

            const productId = getRes.data[0]._id;

            const res = await ProductService.deleteProduct(
                this.state.loggedInUser.id,
                productId
            );
            console.log(res.data.message);
        } catch (err) {
            const resMessage =
                (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
            console.log(resMessage);
        }
    }

    // Need tests for new, update, get, getAll, delete
    async testTransaction() {
        console.log("Testing Transaction: ");
        try {
            console.log("Adding transaction");
            await AuthService.login(this.state.userEmail, this.state.userPassword);
            console.log("Logged In");
            this.setState({
                loggedInUser: AuthService.getCurrentUser(),
            });

            console.log("Adding product");
            const addProdRes = await ProductService.addNewProduct(
                this.state.productName,
                this.state.productPrice,
                this.state.productCategoryId,
                this.state.loggedInUser.id
            );
            console.log(addProdRes.data.message);

            console.log("Adding contact");
            const addContactRes = await ContactService.addNewCustomer(
                this.state.contactName,
                this.state.contactEmail,
                this.state.contactPhoneNumber,
                this.state.contactCompanyName,
                this.state.contactDescription,
                this.state.loggedInUser.id
            );
            console.log(addContactRes.data.message);

            console.log("Getting product for transaction");
            const getProductRes = await ProductService.getAllProducts(
                this.state.loggedInUser.id
            );
            const productId = getProductRes.data[0]._id;
            let productsPurchased = [];
            productsPurchased.push({
                productId: productId,
                quantity: this.state.transactionProductQuantity,
                price: this.state.productPrice,
            });

            console.log("Getting contact for transaction")
            const getContactRes = await ContactService.getAllCustomers(this.state.loggedInUser.id);
            this.setState({
                contactId: getContactRes.data[0]._id,
            });

            const res = await TransactionService.addNewTransaction(
                this.state.transactionRating, 
                productsPurchased,
                this.state.contactId, 
                this.state.loggedInUser.id);
            console.log(res.data.message);
        } catch (err) {
            const resMessage =
                (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
            console.log(resMessage);
        }

        try {
            console.log("Getting all transactions");

            const res = await TransactionService.getAllTransactions(this.state.loggedInUser.id);
            console.log(res.data);
            this.setState({
                transactionId: res.data[0]._id,
            });

        } catch (err) {
            const resMessage =
                (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
            console.log(resMessage);
        }

        try {
            console.log("Deleting transaction");
            const res = await TransactionService.deleteTransaction(
                this.state.loggedInUser.id,
                this.state.transactionId);
            console.log(res.data.message);

            console.log("Deleting product");
            const getRes = await ProductService.getAllProducts(
                this.state.loggedInUser.id
            );

            const productId = getRes.data[0]._id;

            const deleteProductRes = await ProductService.deleteProduct(
                this.state.loggedInUser.id,
                productId
            );
            console.log(deleteProductRes.data.message);

            console.log("Deleting contact");
            const deleteContactRes = await ContactService.deleteCustomer(
                this.state.loggedInUser.id, 
                this.state.contactId);
            console.log(deleteContactRes.data.message);
        } catch (err) {
            const resMessage =
                (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
            console.log(resMessage);
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
                <button onClick={this.testTransaction}>Test</button>
            </div>
        );
    }
}
