import React, { Component } from "react";
import UserService from "../services/user.service";
import CategoryService from "../services/category.service";
import ProductService from "../services/product.service";

export default class ProductTableRow extends Component {
    constructor(props) {
        super(props);
        this.deleteOneProduct = this.deleteOneProduct.bind(this);

        this.state = {
            currentUser: UserService.getCurrentUser(),
            category: "",
        };
    }

    async deleteOneProduct() {
        try {
            if (window.confirm("Are you sure you wish to delete this?")) {
                const res = await ProductService.deleteProduct(this.state.currentUser.id, this.props.product._id);
                // Refresh to refresh category table
                window.location.reload();
            }
        } catch (err) {
            alert("Error deleting product");
        }
    }

    async componentDidMount() {
        try {
            const res = await CategoryService.getOneCategory(this.state.currentUser.id, this.props.product.categoryId);
            this.setState({
                category: res.data,
            });
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.product.name}</td>
                <td>{this.props.product.price}</td>
                <td>
                    <div className="category-containerTable">
                        <div className="category-containerTag" style={{ background: this.state.category.colour }}>
                            {this.state.category ? (
                                this.state.category.name
                            ) : <div>No Category</div>  
                            }
                        </div>
                    </div>
                </td>
                <td>
                    <button className="editCategory-delete" onClick={this.deleteOneProduct}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.3em"
                            height="1.3em"
                            fillRule="currentColor"
                            className="bi bi-x"
                            viewBox="0 0 16 16"
                        >
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </button>
                </td>
            </tr>
        );
    }
}
