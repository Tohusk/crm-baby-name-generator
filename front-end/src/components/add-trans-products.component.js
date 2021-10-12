import React, { Component } from 'react';


// function storeProductsData(data) {
//     var productData = JSON.stringify(data);
// }

class SelectedProduct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            qty: 1,
            //productList: [],
        }
        this.incrementQty = this.incrementQty.bind(this);
        this.reduceQty = this.reduceQty.bind(this);
        
        //this.calculateTotal = this.calculateTotal.bind(this);
        //this.showProduct = this.showProduct.bind(this);

    }

    incrementQty() {
        this.setState({
            qty: this.state.qty + 1
        });
        this.props.handleTotal(this.props.price);
    }

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

    render() {
        const qtyprice = this.props.price * this.state.qty;
        return (
            <div>
                <div className="row form-group">
                
                    <div className="col-sm-10">
                        <h4>{this.props.name}: ${qtyprice}</h4>
                    </div>
                    
                    <div className="col-sm-2 text-right">
                    <span>
                    <button className="btn btn-outline-dark" onClick={this.incrementQty}>+</button>
                    <p>{this.state.qty}</p>
                    <button className="btn btn-outline-dark" onClick={this.reduceQty} disabled={this.state.qty <= 1}>-</button>
                    </span>
                    </div>
                    
                    
                    
                </div>
            </div>
        );
    }
}

export default class AddTransProductForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            //qty: 1,
            total: 0,
            productList: [],
        }
        //this.incrementQty = this.incrementQty.bind(this);
        //this.reduceQty = this.reduceQty.bind(this);
        //this.showProduct = this.showProduct.bind(this);
        //this.setProductList = this.setProductList.bind(this);

        this.calculateTotal = this.calculateTotal.bind(this);

    }

    // setProductList() {
    //     this.setState({
    //         productList: this.props.productArr
    //     })
    // }

    //!!!make sure price is getting added as soon as it is added
    calculateTotal(price) {
        this.setState({
            total: this.state.total + price
        });
        console.log(this.state.total);
    }

    render() {
        const calcTotal = this.calculateTotal;
        if(this.props.selectedProducts.length === 0) return <p>No products selected</p>
        let total = this.state.total //.toFixed(2)
        var products = this.props.selectedProducts.map(function(product) {
            total += product.price;
            return (
                <SelectedProduct
                name={product.name}
                price={product.price}
                handleTotal={calcTotal}
                />
            );
        });
        return (
            <div>
                {products}
                <h3>Total: ${total}</h3>
            </div>
        );
    }

}



