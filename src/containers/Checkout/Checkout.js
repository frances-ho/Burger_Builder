import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients: null,
        totalPrice: 0
    }

    // component will mount itself when it's loaded
    // it will be mounted every time it loads because it is not nested in any other page when it's routed to
    // willMount to set up the state before rendering children component
    // extract ingredients from URL and set it to ingredients in this class
    componentWillMount () {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for(let param of query.entries()){
            //['salad', '1']
            if(param[0] === 'price'){
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1]
            }
        }
        this.setState({ingredients: ingredients, totalPrice: price});
    }

    checkoutCancelledHandle = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandle = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render () {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients} 
                    onCheckoutCancelled={this.checkoutCancelledHandle}
                    checkoutContinued={this.checkoutContinueHandle}/>
            <Route 
                path={this.props.match.path + '/contact-data'} 
                render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)} />
            </div>
        );
    }
}

export default Checkout;