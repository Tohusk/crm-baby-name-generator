import React, { Component } from "react";
import { Redirect } from 'react-router';

export default class CustomerTableRow extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        
        this.state = {
            redirect: false,
        };
    }

    handleClick(e) {
        this.setState({
            redirect: true,
        });
    }

    render() {
        return (
            <tr className="overview-table-row" onClick={this.handleClick}>
                {this.state.redirect ? 
                (
                <Redirect to={{
                    pathname: "/customer-profile",
                    state: { contactId: this.props.customer._id },
                }}/>
                ) 
                : null
                }
                <td>{this.props.id}</td>
                <td>{this.props.customer.name}</td>
                <td>{this.props.customer.email}</td>
                {/* <td>{this.props.obj.score}</td> */}
                {/* <td>{this.props.obj.categories}</td> */}
            </tr>
        );
    }
}
