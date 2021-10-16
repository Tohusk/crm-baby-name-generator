import React, { Component } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import TransactionService from "../services/transaction.service";
import "../styles/AddItem.css";


//displaying row of product that is selected
class SelectedProduct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            qty: 1,
        }
        this.addQty = this.addQty.bind(this);
        this.reduceQty = this.reduceQty.bind(this);
        this._onChange = this._onChange.bind(this);
        this._onClick = this._onClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

    }

    //increase quantity by one
    addQty() {
        this.props.addQty(this.props.product);
        // this.setState({
        //     qty: this.state.qty + 1
        // });
        this.props.handleTotal(this.props.product.price);
    }

    //decrease quantity by one
    reduceQty() {
        this.props.reduceQty(this.props.product);
        // this.setState({
        //   qty: this.state.qty - 1
        // });
        this.props.handleTotal(-this.props.product.price);
    }

    _onChange(e) {
        this.props.updateQty(e.target.value, this.props.product);
        //this.props.handleTotal(this.props.product);
        
    }

    _onClick(e) {
        this.props.handleTotal(this.props.product);
    }

    handleDelete(e) {
        this.props.deleteProduct(this.props.product, this.props.total);
    }

    render() {

        return (
            <div>
                <div className="row form-group">
                
                    <div className="col-sm-10">
                        <h4>{this.props.product.name}: ${this.props.product.price}</h4>
                    </div>
                    
                    <div className="col-sm-2 text-right">
                        
                    <button className="btn btn-outline-dark" onClick={this.reduceQty} disabled={this.props.product.quantity <= 1}>-</button>
                    <span>{this.props.product.quantity}</span>
                    <button className="btn btn-outline-dark" onClick={this.addQty}>+</button>
                    <button className="btn btn-outline-dark" onClick={this.handleDelete}>Delete</button>
                                

                    </div>
                    
                    
                    
                </div>
            </div>
        );
    }
}

//the form to send through
export default class AddTransProductForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //qty: 1,
            
            contactId: '',
            transactionRating: 0,
            total: 0,
            productList: [],
            
        }

        this.calculateTotal = this.calculateTotal.bind(this);
        //this.updateQty = this.updateQty.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.addQty = this.addQty.bind(this);
        this.reduceQty = this.reduceQty.bind(this);

        this.handleRating = this.handleRating.bind(this);
        this.hSumbit = this.hSumbit.bind(this);
    }
    
    //creating an array of objects with quantity attribute
    componentDidUpdate(prevProps) {
        if(this.props.selectedProducts.length !== prevProps.selectedProducts.length){
            console.log(this.props.selectedProducts);


            for(let i in this.props.selectedProducts){
                console.log(this.props.selectedProducts[i]);
                console.log(this.props.selectedProducts[i]['_id']);
                this.setState({
                    productList: [...this.state.productList, {
                        productId: this.props.selectedProducts[i]['_id'],
                        quantity: 1,
                        name: this.props.selectedProducts[i]['name'],
                        price: this.props.selectedProducts[i]['price'],
                    }]
                });
            }

            console.log(this.state.productList);
        }
        
        
    }

    //calculating the total price of purchase
    calculateTotal(price) {
        this.setState({
            total: this.state.total + price
        });
        console.log(this.state.total);

    }



    deleteProduct(deletedProduct, total) {
        const filteredProducts = this.state.productList.filter((product) => product.productId !== deletedProduct.productId);
        this.setState({ productList: filteredProducts });
        const updateTotal = deletedProduct.price * deletedProduct.quantity;
        console.log(total);
        console.log(updateTotal);
        this.setState({total: total - updateTotal});
        console.log(this.state.total);
    }

    addQty(product) {
        console.log(product.quantity);
        const quantity = product.quantity + 1;
        const updateQtyProducts = this.state.productList.map(el => (el.productId === product.productId ? Object.assign({}, el, { quantity }) : el));
        this.setState({ productList: updateQtyProducts });
        console.log(this.state.productList);
        //this.calculateTotal(this.props.price);
    }

    reduceQty(product) {
        const quantity = product.quantity - 1;
        const updateQtyProducts = this.state.productList.map(el => (el.productId === product.productId ? Object.assign({}, el, { quantity }) : el));
        this.setState({ productList: updateQtyProducts });
        //this.calculateTotal(-this.props.price);
    }

    handleRating(e) {
        let rating = parseInt(e.target.value);
        this.setState({
            transactionRating: rating
        });
    }

    //sending post request with the correct request body
    async hSumbit(e){
        //alert("dsfdfs");
        e.preventDefault();
            //console.log(this.state.total);
            // console.log(this.state.transactionRating);
            // console.log(this.state.productList);
            // console.log(this.props.customer._id);
            // console.log(this.props.userId);
            try {
                const res = await TransactionService.addNewTransaction(
                    //this.state.total,
                    this.state.transactionRating,
                    this.state.productList,
                    this.props.customer._id,
                    this.props.userId,
                );
                console.log(res.data);
            } catch (err) {
                const resMessage =
                    (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
                alert(resMessage);
            }
        

    }

    render() {
        const calcTotal = this.calculateTotal;
        const getQty = this.updateQty;
        const deleteProduct = this.deleteProduct;
        const addQty = this.addQty;
        const reduceQty = this.reduceQty;

        let total = this.state.total;

        var products = this.state.productList.map( (product) => {
            console.log(product);
            total += product.price;
            console.log(total);
            return (
                <SelectedProduct
                    key={product.productId}
                    product={product}
                    handleTotal={calcTotal}
                    deleteProduct={deleteProduct}
                    addQty={addQty}
                    reduceQty={reduceQty}
                    total={total}
                />
            );
        });
        console.log(this.state.total);
        return (
            <div>
                <div>
                {products}
                <h3>Total: ${total}</h3>
                </div>
                <div>
                    <br />
          <div className="addTransaction-subtitle">How satisfied was the customer? (Optional)</div>
          <br />
            
            
              <div className="form-check form-check-inline">
                <label className="radio">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="name"
                    value="1"//{this.state.name}
                    onChange={this.handleRating}
                  // validations={[required]}
                  />
                  Very Unsatisfied (1)              
                </label>
              </div>
              <div className="form-check form-check-inline">
                <label className="radio">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="name"
                    value="2"//{this.state.name}
                    onChange={this.handleRating}
                  // validations={[required]}
                  />
                  Unsatisfied (2)           
                </label>
              </div>
              <div className="form-check form-check-inline">
                <label className="radio">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="name"
                    value="3"//{this.state.name}
                    onChange={this.handleRating}
                  // validations={[required]}
                  />
                  Neutral (3)              
                </label>
              </div>
              <div className="form-check form-check-inline">
                <label className="radio">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="name"
                    value="4"//{this.state.name}
                    onChange={this.handleRating}
                  // validations={[required]}
                  />
                  Satisfied (4)              
                </label>
              </div>
              <div className="form-check form-check-inline">
                <label className="radio">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="name"
                    value="5"//{this.state.name}
                    onChange={this.handleRating}
                  // validations={[required]}
                  />
                  Very Satisfied (5)              
                </label>
              </div>
              <div className="addTransaction-submit-group">
                <a className="addTransaction-cancelButton" href="/home">Cancel</a>
                <button onClick={this.hSumbit} className="submitButton">
                  Submit
                </button>
              </div>

              
            
              
            {/* </form> */}
            <br />
            </div>
            </div>
        );
    }

}



