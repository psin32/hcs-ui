import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import queryString from 'query-string';
import {withRouter} from "react-router-dom";
import Loader from '../common/Loader.js'
import jquery from 'jquery';
import Navbar from '../common/Navbar.js'
import SearchPanel from '../common/SearchPanel.js'
import Footer from '../common/Footer.js'
import Topbar from '../common/Topbar.js'

class OrderConfirmation extends Component {

	constructor() {
		super();
		this.state = {
		    orders : [],
		    items : [],
		    shippingaddress : [],
		    paypalPayment : [],
		    payer : [],
			responseReceived : false,
			username : ''
		};
	}
	
	componentWillMount() {
		this.orderConfirmation();
	}

	orderConfirmation() {
		const cookies = new Cookies();
		const token = cookies.get('TOKEN');
		const name = cookies.get('USERNAME');

	    const api = axios.create({
	    	headers: {'Authorization': 'Bearer '+token},
	    	withCredentials: true
	    });
	    const parsed = queryString.parse(this.props.location.search);
	    let paymentId = parsed.paymentId;
	    let payerId = parsed.PayerID;
	    let tokenId = parsed.token;
	    
	    let orderConfirmationURL = process.env.REACT_APP_ORDER_APP_POST_ORDER_CONFIRMATION_URL;
	    
	    api.post(orderConfirmationURL, 
		    {
	    	  "paymentId": paymentId,
	    	  "payerId": payerId,
	    	  "token": tokenId
	    	}
	    )
	    .then((response) => {
            this.setState({
            	orders : response.data,
    			items : response.data.items,
    			shippingaddress : response.data.shippingaddress,
    			paypalPayment : response.data.paypalPayment,
    			payer : response.data.paypalPayment.payer,
    			responseReceived : true,
    			username : name
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
		    	if(error.response.status === 500) {
		    		this.props.history.push("/checkout");
		    	}
	    	}
	    });
	}
	
    render() {
    	
	    const items = this.state.items.map((alldata, index) => {
		      return (
		    		  <div className="row p-3 items-ordered">
		    		  	<div className="col col-lg-2 col-md-2 col-sm-4 col-4">
		    		  		<img src={alldata.image}></img>
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
	    
	    let orderConfirmationContent = (
	    		<section>
					<div className="container">
						<header className="mb-5">
							<h2 className="text-uppercase">Please wait...</h2>
						</header>
					</div>
				</section>	    		
	    );
	    if(this.state.responseReceived) {
	    	orderConfirmationContent = (
					<section>
						<div className="container">
							<header className="center mb-5">
								<h2 className="text-uppercase">Thanks for your order</h2>
								<span>Hi {this.state.username}, we've received your order and working on it now.</span><br/>
								<span>We'll email you an update when we've shipped it.</span>
							</header>
							<div className="row">
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
						</div>
					</section>	    			
	    	);
	    }

	    return (
			<div>
			  <Topbar />
		      <Navbar />
		      <SearchPanel />
		        <Loader data={this.state.responseReceived} fullscreen="true"/>
				<div className="container">
					<ol className="breadcrumb">
						<li className="breadcrumb-item text-uppercase"> <a href="/" className="text-primary">Home</a></li>
						<li className="breadcrumb-item active text-uppercase">Order Confirmation</li>
					</ol>
				</div>
				{orderConfirmationContent}
		      <Footer />
		    </div>
	    );
    }
}

export default withRouter(OrderConfirmation);