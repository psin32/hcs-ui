import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {withRouter} from "react-router-dom";
import Loader from '../common/Loader.js';
import OrderDetails from './OrderDetails.js';

class OrderHistory extends Component {

	constructor() {
		super();
		this.state = {
		    orders : [],
		    items : [],
		    shippingaddress : [],
		    paypalPayment : [],
		    payer : [],
			responseReceived : false,
			displayOrderHistory : true,
			displayOrderDetails : false
		};
		document.title = "My Account | Orders";
	}
	
	componentWillMount() {
		this.fetchOrders();
	}
	
	fetchOrders() {
		const cookies = new Cookies();
		const token = cookies.get('TOKEN');

	    const api = axios.create({
	    	headers: {'Authorization': 'Bearer '+token},
	    	withCredentials: true
	    });
	    
	    let orderHistoryUrl = process.env.REACT_APP_ORDER_APP_GET_ORDER_HISTORY_URL;
	    
	    api.get(orderHistoryUrl)
	    .then((response) => {
            this.setState({
            	orders : response.data,
    			responseReceived : true,
    			displayOrderHistory : true,
    			displayOrderDetails : false
            });
	    })
	    .catch((error) => {
	    	if (error.response) {
				this.setState({
					responseReceived : true
		        });		
		    	if(error.response.status === 403) {
		    		if (null == token) {
		    			this.props.history.push("/clearcookie#accessdenied");
		    		} else {
		    			this.props.history.push("/clearcookie#timeout");	
		    		}
		    	}
	    	}
	    });	
	}
	
	onClickOrder(event) {
		event.preventDefault();
		const cookies = new Cookies();
		const token = cookies.get('TOKEN');

	    const api = axios.create({
	    	headers: {'Authorization': 'Bearer '+token},
	    	withCredentials: true
	    });
	    
	    let orderDetailsUrl = process.env.REACT_APP_ORDER_APP_GET_ORDER_DETAILS_URL;
	    
	    api.get(orderDetailsUrl+event.target.name)
	    .then((response) => {
            this.setState({
            	orders : response.data,
    			items : response.data.items,
    			shippingaddress : response.data.shippingaddress,
    			paypalPayment : response.data.paypalPayment,
    			payer : response.data.paypalPayment.payer,
    			responseReceived : true,
    			displayOrderHistory : false,
    			displayOrderDetails : true
            });
	    })
	    .catch((error) => {
	    	if (error.response) {
				this.setState({
					responseReceived : true
		        });		
		    	if(error.response.status === 403) {
		    		if (null == token) {
		    			this.props.history.push("/clearcookie#accessdenied");
		    		} else {
		    			this.props.history.push("/clearcookie#timeout");	
		    		}
		    	}
	    	}
	    });
	}
	
	onClickOrderHistory(event) {
		event.preventDefault();
		this.fetchOrders();
	}

    render() {
    	
    	let content = null;
    	let pageHeader = null;

    	if(this.state.displayOrderHistory) {
    		
    		pageHeader = "Order History";
    		if(this.state.orders.length > 0) {
	    		const orders = this.state.orders.map((alldata, index) => {
		  		      return (
		  		    		  <div className="row pt-3 pb-3 items-ordered">
		  		    		  	<div className="col col-lg-5 col-md-4 col-sm-12 col-12">
		  		    		  		<a href="" onClick={this.onClickOrder.bind(this)} className="order-details-link" name={alldata.ordersId}>{alldata.ordersId}</a>
		  		    		  	</div>
		  		    		  	<div className="col col-lg-2 col-md-4 col-sm-12 col-12">
		  		    		  		£{alldata.formattedOrdertotal}<br/>
		  		    		  	</div>
		  		    		  	<div className="col col-lg-3 col-md-2 col-sm-12 col-12">
		  		    		  		{alldata.timeplaced}
		  		    		  	</div>
		  		    		  	<div className="col col-lg-2 col-md-2 col-sm-12 col-12">
		  		    		  		Completed
		  		    		  	</div>
		  		    		  </div>
		  		    		  
		  		      );
		  		});
		  	    
		  	    if(this.state.responseReceived) {
		  	    	content = (
		  				<section className="cart">
		  						<div>
		  							<div className="cart-heading text-center">
		  								<div className="row">
		  									<div className="col-5">Order Id</div>
		  									<div className="col-2">Total Price</div>
		  									<div className="col-3">Date</div>
		  									<div className="col-2">Status</div>
		  								</div>
		  							</div>
		  							<div className="cart-body text-center">
		  								{orders}
		  							</div>
		  						</div>	
		  			    </section>
		  	    	);
		  	    }
    		} else {
    			if(this.state.responseReceived) {
    				content = (
	    		  		<div className="cart">
		  					You don't have any orders.
		  			    </div>
		  	    	);
    			}
    		}
    	}
    	
    	if(this.state.displayOrderDetails) {
    		
    		pageHeader = "Order Details";
    		
    	    const items = this.state.items.map((alldata, index) => {
	  		      return (
	  		    		  <div className="row p-3 items-ordered">
	  		    		  	<div className="col col-lg-2 col-md-2 col-sm-4 col-4">
	  		    		  		<img src={alldata.image} className="thumb"></img>
	  		    		  	</div>
	  		    		  	<div className="col col-lg-4 col-md-4 col-sm-12 col-12">
	  		    		  		{alldata.name}<br/>
	  		    		  		<i>SKU: {alldata.partnumber}</i>
	  		    		  	</div>
	  		    		  	<div className="col col-lg-2 col-md-2 col-sm-12 col-12">
	  		    		  		{alldata.quantity}
	  		    		  	</div>
	  		    		  	<div className="col col-lg-2 col-md-2 col-sm-12 col-12">
	  		    		  		£{alldata.formattedListprice}
	  		    		  	</div>
	  		    		  	<div className="col col-lg-2 col-md-2 col-sm-12 col-12">
	  		    		  		£{alldata.formattedItemtotal}
	  		    		  	</div>
	  		    		  </div>
	  		      );
	  		});

	  	    if(this.state.responseReceived) {
	  	    	
	  	    	content = (
	  				<div className="row">
	  					<a href="#" className="p-3" onClick={this.onClickOrderHistory.bind(this)}>Go back to Order History</a>
	  					<div className="col col-lg-12 col-md-12 col-sm-12 col-12">
	  			    		<div className="card">
	  					      <div className="card-header">
	  					         <h5 className="mb-0">
	  					         	<span className="order-summary__shopping">Order & Shipping Info</span>
	  					         </h5>
	  					      </div>
	  					      <div className="row order-and-shipping p-3">
	  							<div className="col col-lg-8 col-md-8 col-sm-12 col-12 p-3">
	  								<strong className="text-uppercase order-shipping-header">Order Details</strong><br/>
	  								<div className="row pt-3">
	  									<div className="col col-lg-4 col-md-4 col-sm-4 col-4">
	  										<strong>Order #: </strong><br/>
	  										<strong>Shipping Method: </strong><br/>
	  										<strong>Status: </strong>
	  									</div>
	  									<div className="col col-lg-8 col-md-8 col-sm-8 col-8">
	  										<u>{this.state.orders.ordersId}</u><br/>
	  										{this.state.orders.shippingmethod}<br/>
	  										Completed<br/>
	  									</div>
	  								</div>
	  							</div>					
	  							<div className="col col-lg-4 col-md-4 col-sm-12 col-12 p-3">
	  								<strong className="text-uppercase order-shipping-header">Shipping Address</strong><br/>
	  								<div className="row pt-3">
	  									<div className="col col-lg-12 col-md-12 col-sm-12 col-12">
	  										{this.state.shippingaddress.title} {this.state.shippingaddress.firstname} {this.state.shippingaddress.lastname}<br/>
	  										{this.state.shippingaddress.address1}, {this.state.shippingaddress.address2}<br/>
	  										{this.state.shippingaddress.city}, {this.state.shippingaddress.zipcode}<br/>
	  										{this.state.shippingaddress.country}
	  									</div>
	  								</div>
	  							</div>
	  					      </div>
	  					    </div>
	  				    </div>
	  					<div className="col col-lg-12 col-md-12 col-sm-12 col-12">
	  			    		<div className="card">
	  					      <div className="card-header">
	  					         <h5 className="mb-0">
	  					         	<span className="order-summary__shopping">Items Ordered</span>
	  					         </h5>
	  					      </div>
	  						  {items}
	  					    </div>
	  				    </div>
	  					<div className="col col-lg-12 col-md-12 col-sm-12 col-12">
	  			    		<div className="card">
	  					      <div className="card-header">
	  					         <h5 className="mb-0">
	  					         	<span className="order-summary__shopping">Order & Payment Summary</span>
	  					         </h5>
	  					      </div>
	  					      <div className="row order-and-shipping p-3">
	  							<div className="col col-lg-6 col-md-6 col-sm-12 col-12 p-3">
	  								<strong className="text-uppercase order-shipping-header">Payment Summary</strong><br/>
	  								<div className="row pt-3">
	  									<div className="col col-lg-6 col-md-6 col-sm-6 col-6">
	  										<strong>Payment Method: </strong><br/>
	  										<strong>Paypal Email: </strong><br/>
	  										<strong>Paypal Amount: </strong>
	  									</div>
	  									<div className="col col-lg-6 col-md-6 col-sm-6 col-6">
	  										Paypal<br/>
	  										{this.state.payer.email}<br/>
	  										£{this.state.paypalPayment.amount}<br/>
	  									</div>
	  								</div>
	  							</div>
	  							<div className="col col-lg-6 col-md-6 col-sm-12 col-12 p-3">
	  								<strong className="text-uppercase order-shipping-header">Order Summary</strong><br/>
	  								<div className="row pt-3">
	  									<div className="col col-lg-6 col-md-6 col-sm-6 col-6">
	  										<strong>Subtotal: </strong><br/>
	  										<strong>Shipping Charges: </strong><br/>
	  										<strong>Order Total: </strong>
	  									</div>
	  									<div className="col col-lg-6 col-md-6 col-sm-6 col-6">
	  										£{this.state.orders.formattedSubtotal}<br/>
	  										£{this.state.orders.formattedShippingcharges}<br/>
	  										£{this.state.orders.formattedOrdertotal}<br/>
	  									</div>
	  								</div>
	  							</div>
	  					      </div>
	  					    </div>
	  				    </div>
	  				</div>
	  	    	);
	  	    }
    	}

    	return (
    	    	<div className="col-lg-8">
    		        <Loader data={this.state.responseReceived} fullscreen="true"/>
    				<div className="padding-top-2x mt-2 hidden-lg-up"></div>
    				<h4>{pageHeader}</h4>
    				<hr className="padding-bottom-1x"/>
    				{content}
    		    </div>
    	);
    }
}

export default withRouter(OrderHistory);