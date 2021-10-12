import React, { Component } from "react";
import AuthService from "../services/auth.service";
import { Redirect } from 'react-router';
import CategoryService from "../services/category.service";

export default class ProductTableRow extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            currentUser: AuthService.getCurrentUser(),
            category: "",
        };
    }

    async componentDidMount() {
        try {
            const res = await CategoryService.getOneCategory(this.state.currentUser.id, this.props.product.categoryId);
            this.setState({
                category: res.data,
            }); 
        } catch (err) {
            alert(err)
        }

    }

    render() {
        return (
            <tr>                
                <td>{this.props.id}</td>
                <td>{this.props.product.name}</td>
                <td>{this.props.product.price}</td>
                <td>{this.state.category.name}</td>
                {/* <td>{this.props.obj.score}</td> */}
                {/* <td>{this.props.obj.categories}</td> */}
            </tr>
        );
    }
}
