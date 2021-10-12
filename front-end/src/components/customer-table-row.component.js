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
            <tr onClick={this.handleClick}>
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
                <td>{this.props.customer.satisfactionScore ? this.props.customer.satisfactionScore : "N/A"}</td>
                <td>
                    <div className="category-containerOverview">
                        <div className="category-containerTag" style={{background: '#ff80ff'}}>Fruits</div>
                        <div className="category-containerTag" style={{background: '#8080ff'}}>Veges</div>
                    </div>
                </td>
                {/* <td>{this.props.obj.score}</td> */}
                {/* <td>{this.props.obj.categories}</td> */}
            </tr>
        );
    }
}
