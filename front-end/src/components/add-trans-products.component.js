import React, { Component } from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import TransactionService from "../services/transaction.service";
import "../styles/AddItem.css";


//displaying row of product that is selected
class SelectedProduct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            qty: 1,
            //productList: [],
        }
        this.incrementQty = this.incrementQty.bind(this);
        this.reduceQty = this.reduceQty.bind(this);
        this._onChange = this._onChange.bind(this);
        this._onClick = this._onClick.bind(this);
        //this.calculateTotal = this.calculateTotal.bind(this);
        //this.showProduct = this.showProduct.bind(this);

    }

    //increase quantity by one
    incrementQty() {
        this.setState({
            qty: this.state.qty + 1
        });
        this.props.handleTotal(this.props.price);
    }

    //decrease quantity by one
    reduceQty() {
        this.setState({
          qty: this.state.qty - 1
        });
        this.props.handleTotal(-this.props.price);
    }

    //!!!make sure price is getting added as soon as it is added
    // calculateTotal(price) {
    //     this.setState({
    //         total: this.state.total + price
    //     });
    //     console.log(this.state.total);
    // }

    _onChange(e) {
        this.props.updateQty(e.target.value, this.props.product);
        this.props.handleTotal(this.props.product);
        
    }
    //!!!PROBLEM: THE TWO FUNCTIONS IN ONCHANGE NEED TO BE ASYMC
    //WORKS WELL IF THERE'S A SEPARATE UPDATE QUANTITY BUTTON
    //May need to change back to an input with two buttons on the side with increment and reduce

    _onClick(e) {
        this.props.handleTotal(this.props.product);
    }

    render() {
        //const qtyprice = this.props.price * this.state.qty;
        return (
            <div>
                <div className="row form-group">
                
                    <div className="col-sm-10">
                        <h4>{this.props.product.name}: ${this.props.product.price}</h4>
                    </div>
                    
                    <div className="col-sm-2 text-right">
                        <input
                            type="number" 
                            min="1"
                            value={this.props.product.qty}
                            onChange={this._onChange}
                            defaultValue={this.props.product.qty}
                        />
                        {/* <button onClick={this._onClick}>Update</button> */}
                                
                        
                    {/* <span>
                    <button className="btn btn-outline-dark" onClick={this.incrementQty}>+</button>
                    <p>{this.state.qty}</p>
                    <button className="btn btn-outline-dark" onClick={this.reduceQty} disabled={this.state.qty <= 1}>-</button>
                    </span> */}
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
            satisfactionRating: 0,
            total: 0,
            productList: [],
            loading: false,
            message: "",
        }
        //this.incrementQty = this.incrementQty.bind(this);
        //this.reduceQty = this.reduceQty.bind(this);
        //this.showProduct = this.showProduct.bind(this);
        //this.setProductList = this.setProductList.bind(this);

        this.calculateTotal = this.calculateTotal.bind(this);
        this.updateQty = this.updateQty.bind(this);
        this.handleRating = this.handleRating.bind(this);
        this.handleSumbit = this.handleSumbit.bind(this);
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
                        qty: 1,
                        name: this.props.selectedProducts[i]['name'],
                        price: this.props.selectedProducts[i]['price'],
                    }]
                })
            }
            console.log(this.state.productList);
        }
        
        
    }

    //calculating the total price of purchase
    calculateTotal(product) {
        console.log(this.state.total);
        let newTotal = 0;
        for(let i in this.state.productList){
                newTotal -= this.state.productList[i]['price'];
                newTotal += this.state.productList[i]['price'] * this.state.productList[i]['qty'];
                console.log(this.state.productList[i]['price']);
                console.log(this.state.productList[i]['qty']);
                console.log(newTotal);
        }
        this.setState({ total: newTotal});
        // let newPrice = this.state.total + product.price * product.qty; 
        // this.setState({
        //     total: newPrice
        // });
        console.log(newTotal);
        console.log(this.state.total);
    }

        updateQty(quantity, product) {
        //need to update the quantity - but qty for each product
        //(probably have to update the matching product object within the product list) 
        //console.log(product);
        
        let items = [...this.state.productList];
        //var key = 0;
        for(let i in this.state.productList){
            if(product['productId'] === this.state.productList[i]['productId']){
                let item = {
                    ...items[i],
                    qty: quantity
                }
                items[i] = item;
                this.setState({productList: items});
            }
        }

        //var value = product[qty];
        // for(let i in this.state.productList){
        //     if(product.productId === this.state.productList[i]['productId']){
        //         this.setState({
        //             productList[i]['productId']: 
        //         })
        //         // this.setState(prevState => ({
        //         //     productList: prevState.productList.map(
        //         //     obj => (obj._id === 1234 ? Object.assign(obj, { description: "New Description" }) : obj)
        //         //   )
        //         // }));
        //     }
        // }
    };

    handleRating(e) {
        this.setState({
            satisfactionRating: e.target.value
        });
    }

    //sending post request with the correct request body
    async handleSumbit(e){
        e.preventDefault();

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            try {
                const res = await TransactionService.addNewTransaction(
                    this.state.total,
                    this.state.satisfactionRating,
                    this.state.productList,
                    this.props.customer._id,
                    this.props.userId,
                );
                this.setState({
                    message: res.data.message,
                    loading: false,
                });
            } catch (err) {
                const resMessage =
                    (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
                this.setState({
                    loading: false,
                    message: resMessage,
                });
            }
        } else {
            this.setState({
                loading: false,
            });
        }

    }

    render() {
        const calcTotal = this.calculateTotal;
        const getQty = this.updateQty;

        let total = this.state.total;

        var products = this.state.productList.map(function(product) {
            console.log(product);
            total += product.price;
            return (
                <SelectedProduct
                //name={product.name}
                //price={product.price}
                //qty={product.qty}
                product={product}
                handleTotal={calcTotal}
                updateQty={getQty}
                />
            );
        });
        return (
            <div>
                <div>
                {products}
                {/* <input className="addTrans-products-form">{products}</input> */}
                <h3>Total: ${total}</h3>
                </div>
                <div>
                    <br />
                <Form onSubmit={this.handleSubmit}>
          <div className="addTransaction-subtitle">How satisfied was the customer? (Optional)</div>
          <br />
            
            
              <div className="form-check form-check-inline">
                <label className="radio">
                  <Input
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
                  <Input
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
                  <Input
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
                  <Input
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
                  <Input
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
                <button
                className="submitButton"
                >
                  Done
                </button>
              </div>
            </Form>
            <br />
            </div>
            </div>
        );
    }

}



