import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {withRouter} from "react-router-dom";
import Loader from '../common/Loader.js'
import CheckoutNavbar from '../common/CheckoutNavbar.js'
import SearchPanel from '../common/SearchPanel.js'
import Footer from '../common/Footer.js'
import DeliveryOption from './DeliveryOption.js'
import DeliveryMethod from './DeliveryMethod.js'
import ShippingMethod from './ShippingMethod.js'
import SideOrderSummary from './SideOrderSummary.js'
import Payment from './Payment.js'
import jquery from 'jquery';

class Checkout extends Component {

	constructor() {
		super();
		this.state = {
		    orders : [],
		    items : [],
			responseReceived : false,
			showDeliveryMethod : false,
			showShippingMethod : false,
			showPayment : false,
			option_href_css : '',
			method_href_css : 'collapsed disabled-link',
			shipping_href_css : 'collapsed disabled-link',			
			payment_href_css : 'collapsed disabled-link',
			option_div_css : 'collapse show mt-3 ml-3 mr-3',
			method_div_css : 'collapse mt-3 ml-3 mr-3',
			shipping_div_css : 'collapse mt-3 ml-3 mr-3',
			payment_div_css : 'collapse',
			option_area_expanded : true,
			method_area_expanded : false,
			shipping_area_expanded : false,
			payment_area_expanded : false,
			option_edit_button : false,
			method_edit_button : false,
			shipping_edit_button : false
		};
		this.onSubmitDeliveryOption = this.onSubmitDeliveryOption.bind(this);
		this.onSubmitDeliveryMethod = this.onSubmitDeliveryMethod.bind(this);
		this.onClickShippingMethod = this.onClickShippingMethod.bind(this);
		this.onSubmitShippingMethod = this.onSubmitShippingMethod.bind(this);
	}
	
	componentWillMount() {
		this.fetchSideOrderSummary();
	}
	
	fetchSideOrderSummary() {
		const cookies = new Cookies();
		const token = cookies.get('TOKEN');

	    const api = axios.create({
	    	headers: {'Authorization': 'Bearer '+token},
	    	withCredentials: true
	    });
	    
	    let getSideOrderSummaryURL = process.env.REACT_APP_ORDER_APP_GET_SIDE_ORDER_SUMMARY_URL;
	    
	    api.get(getSideOrderSummaryURL)
	    .then((response) => {
            this.setState({
    			items : response.data.items,
    			responseReceived : true,
    			orders : response.data
            });
        	if(this.state.orders.ordertype == 'HOME') {
        		this.setState({
        			showDeliveryMethod: true,
        			showShippingMethod: false,
        			showPayment: false,
        			option_href_css : 'collapsed disabled-link',
        			method_href_css : 'disabled-link',
        			shipping_href_css : 'collapsed disabled-link',
        			payment_href_css : 'collapsed disabled-link',
    				option_div_css : 'collapse mt-3 ml-3 mr-3',
    				method_div_css : 'collapse show mt-3 ml-3 mr-3',
    				shipping_div_css : 'collapse mt-3 ml-3 mr-3',
    				payment_div_css : 'collapse',
    				option_area_expanded : false,
    				method_area_expanded : true,
    				shipping_area_expanded : false,
    				payment_area_expanded : false,
    				option_edit_button : true,
    				method_edit_button : false,
    				shipping_edit_button : false
        		});
        	}
        	if(this.state.orders.shippingaddress) {
        		this.setState({
        			showDeliveryMethod: true,
        			showShippingMethod: true,
        			showPayment: false,
        			option_href_css : 'collapsed disabled-link',
        			method_href_css : 'collapsed disabled-link',
        			shipping_href_css : 'disabled-link',
        			payment_href_css : 'collapsed disabled-link',
    				option_div_css : 'collapse mt-3 ml-3 mr-3',
    				method_div_css : 'collapse mt-3 ml-3 mr-3',
    				shipping_div_css : 'collapse show mt-3 ml-3 mr-3',
    				payment_div_css : 'collapse',
    				option_area_expanded : false,
    				method_area_expanded : false,
    				shipping_area_expanded : true,
    				payment_area_expanded : false,
    				option_edit_button : true,
    				method_edit_button : true,
    				shipping_edit_button : false
        		});
        	}
        	if(this.state.orders.shippingmethod) {
        		this.setState({
        			showDeliveryMethod: true,
        			showShippingMethod: true,
        			showPayment: true,
        			option_href_css : 'collapsed disabled-link',
        			method_href_css : 'collapsed disabled-link',
        			shipping_href_css : 'collapsed disabled-link',
        			payment_href_css : 'disabled-link',
    				option_div_css : 'collapse mt-3 ml-3 mr-3',
    				method_div_css : 'collapse mt-3 ml-3 mr-3',
    				shipping_div_css : 'collapse mt-3 ml-3 mr-3',
    				payment_div_css : 'collapse show',
    				option_area_expanded : false,
    				method_area_expanded : false,
    				shipping_area_expanded : false,
    				payment_area_expanded : true,
    				option_edit_button : true,
    				method_edit_button : true,
    				shipping_edit_button : true
        		});
        	}        	
        	if(this.state.orders.shippingmethod) {
        		
        	}
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
	
	onSubmitDeliveryOption(event, option) {
		event.preventDefault();
		if(option) {
			const cookies = new Cookies();
			const token = cookies.get('TOKEN');
	
		    const api = axios.create({
		    	headers: {'Authorization': 'Bearer '+token},
		    	withCredentials: true
		    });

		    let deliveryOptionURL = process.env.REACT_APP_ORDER_APP_POST_DELIVERY_OPTION;
		    
		    api.get(deliveryOptionURL+option
			)
			.then((response) => {
				this.setState({
					responseReceived : true
		        });
		    	if (response.status === 200) {
		    		if(option == 'HOME') {
						this.setState({
		        			showDeliveryMethod: true,
		        			showShippingMethod: false,
		        			showPayment: false,
							option_href_css : 'collapsed disabled-link',
							method_href_css : 'disabled-link',
							shipping_href_css : 'collapsed disabled-link',
							payment_href_css : 'collapsed disabled-link',
							option_div_css : 'collapse mt-3 ml-3 mr-3',
							method_div_css : 'collapse show mt-3 ml-3 mr-3',
							shipping_div_css : 'collapse mt-3 ml-3 mr-3',
							payment_div_css : 'collapse',
							option_area_expanded : false,
							method_area_expanded : true,
							shipping_area_expanded : false,
							payment_area_expanded : false,
							option_edit_button : true,
							method_edit_button : false,
							shipping_edit_button : false
				        });
		    		}
		    	}
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
		} else {
			document.getElementById("errormessage").style.display = "block";
			jquery('#errormessage').delay(3000).hide(1000);
		}
	}
	
	onSubmitDeliveryMethod(event, formdata) {
		event.preventDefault();
		const cookies = new Cookies();
		const token = cookies.get('TOKEN');

	    const api = axios.create({
	    	headers: {'Authorization': 'Bearer '+token},
	    	withCredentials: true
	    });

	    const {userId, address_id, title, firstname, lastname, email1, address1, address2, address3, city, state, country, zipcode, phone1, addresstype, isprimary, selfaddress, status, email2, phone2, nickname, shipping, billing} = formdata;
	    
	    let saveShippingAddressURL = process.env.REACT_APP_ORDER_APP_POST_SAVE_DELIVERY_ADDRESS_URL;
	    
	    api.post(saveShippingAddressURL,
	    	{
				"address_id": address_id,
				"addresstype": addresstype,
				"status": status,
				"isprimary": isprimary,
				"selfaddress": selfaddress,
				"title": title,
				"firstname": firstname,
				"lastname": lastname,
				"email1": email1,
				"phone1": phone1,
				"address1": address1,
				"address2": address2,
				"address3": address3,
				"city": city,
				"state": state,
				"zipcode": zipcode,
				"country": country
	    	}	    		
		)
		.then((response) => {
			this.setState({
				responseReceived : true
	        });
	    	if (response.status === 200) {
	    		this.setState({
	    			orders : response.data
	    		});
				this.setState({
					showDeliveryMethod: true,
					showShippingMethod: true,
					showPayment: false,
					option_href_css : 'collapsed disabled-link',
					method_href_css : 'collapsed disabled-link',
					shipping_href_css : 'disabled-link',
					payment_href_css : 'collapsed disabled-link',
					option_div_css : 'collapse mt-3 ml-3 mr-3',
					method_div_css : 'collapse mt-3 ml-3 mr-3',
					shipping_div_css : 'collapse show mt-3 ml-3 mr-3',
					payment_div_css : 'collapse disabled-link',
					option_area_expanded : false,
					method_area_expanded : false,
					shipping_area_expanded : true,
					payment_area_expanded : false,
					option_edit_button : true,
					method_edit_button : true,
					shipping_edit_button : false
		        });
	    	}
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
	
	onClickShippingMethod(event) {
		event.preventDefault();
		let shippingmethod = event.target.value;
		const cookies = new Cookies();
		const token = cookies.get('TOKEN');

	    const api = axios.create({
	    	headers: {'Authorization': 'Bearer '+token},
	    	withCredentials: true
	    });

	    let saveShippingMethodURL = process.env.REACT_APP_ORDER_APP_GET_SAVE_SHIPPING_METHOD_URL;
	    
	    api.get(saveShippingMethodURL+shippingmethod)
		.then((response) => {
			this.setState({
				responseReceived : true
	        });
	    	if (response.status === 200) {
				this.setState({
	    			items : response.data.items,
	    			responseReceived : true,
	    			orders : response.data,
	    			showDeliveryMethod :true
		        });
	    	}
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
	
	onSubmitShippingMethod(event, shippingmethod) {
		event.preventDefault();
		if(shippingmethod) {
			this.setState({
    			showDeliveryMethod: true,
    			showShippingMethod: true,
    			showPayment: true,
				option_href_css : 'collapsed disabled-link',
				method_href_css : 'collapsed disabled-link',
				shipping_href_css : 'collapsed disabled-link',
				payment_href_css : 'disabled-link',
				option_div_css : 'collapse mt-3 ml-3 mr-3',
				method_div_css : 'collapse mt-3 ml-3 mr-3',
				shipping_div_css : 'collapse mt-3 ml-3 mr-3',
				payment_div_css : 'collapse show mt-3 ml-3 mr-3',
				option_area_expanded : false,
				method_area_expanded : false,
				shipping_area_expanded : false,
				payment_area_expanded : true,
				option_edit_button : true,
				method_edit_button : true,
				shipping_edit_button : true
	        });
		} else {
			document.getElementById("errormessage").style.display = "block";
			jquery('#errormessage').delay(3000).hide(1000);
		}
	}
	
	onClickDeliveryOptionSection() {
		this.setState({
			option_href_css : 'disabled-link',
			method_href_css : 'collapsed disabled-link',
			shipping_href_css : 'collapsed disabled-link',
			payment_href_css : 'collapsed disabled-link',
			option_div_css : 'collapse show mt-3 ml-3 mr-3',
			method_div_css : 'collapse mt-3 ml-3 mr-3',
			shipping_div_css : 'collapse mt-3 ml-3 mr-3',
			payment_div_css : 'collapse mt-3 ml-3 mr-3',
			option_area_expanded : true,
			method_area_expanded : false,
			shipping_area_expanded : false,
			payment_area_expanded : false
        });
	}

	onClickDeliveryMethodSection() {
		this.setState({
			option_href_css : 'collapsed disabled-link',
			method_href_css : 'disabled-link',
			shipping_href_css : 'collapsed disabled-link',
			payment_href_css : 'collapsed disabled-link',
			option_div_css : 'collapse mt-3 ml-3 mr-3',
			method_div_css : 'collapse show mt-3 ml-3 mr-3',
			shipping_div_css : 'collapse mt-3 ml-3 mr-3',
			payment_div_css : 'collapse mt-3 ml-3 mr-3',
			option_area_expanded : false,
			method_area_expanded : true,
			shipping_area_expanded : false,
			payment_area_expanded : false
        });
	}
	
	onClickShippingMethodSection() {
		this.setState({
			option_href_css : 'collapsed disabled-link',
			method_href_css : 'collapsed disabled-link',
			shipping_href_css : 'disabled-link',
			payment_href_css : 'collapsed disabled-link',
			option_div_css : 'collapse mt-3 ml-3 mr-3',
			method_div_css : 'collapse mt-3 ml-3 mr-3',
			shipping_div_css : 'collapse show mt-3 ml-3 mr-3',
			payment_div_css : 'collapse mt-3 ml-3 mr-3',
			option_area_expanded : false,
			method_area_expanded : false,
			shipping_area_expanded : true,
			payment_area_expanded : false
        });
	}
	

    render() {
    	let deliveryOptionComponent = <DeliveryOption orders={this.state.orders} onSubmit={this.onSubmitDeliveryOption} />;

    	let deliveryMethodComponent = null;
    	if(this.state.showDeliveryMethod) {
    		deliveryMethodComponent = <DeliveryMethod orders={this.state.orders} onSubmit={this.onSubmitDeliveryMethod}/>;
    	}
    	
    	let shippingMethodComponent = null;
    	if(this.state.showShippingMethod) {
    		shippingMethodComponent = <ShippingMethod orders={this.state.orders} onClick={this.onClickShippingMethod} onSubmit={this.onSubmitShippingMethod}/>;
    	}
    	
    	let deliveryOptionEditSection  = null;
    	if(this.state.option_edit_button) {
    		deliveryOptionEditSection = <div className="edit-checkout-section"><a href="#" onClick={this.onClickDeliveryOptionSection.bind(this)}>Edit</a></div>;
    	}

    	let deliveryMethodEditSection  = null;
    	if(this.state.method_edit_button) {
    		deliveryMethodEditSection = <div className="edit-checkout-section"><a href="#" onClick={this.onClickDeliveryMethodSection.bind(this)}>Edit</a></div>;
    	}

    	let shippingMethodEditSection  = null;
    	if(this.state.shipping_edit_button) {
    		shippingMethodEditSection = <div className="edit-checkout-section"><a href="#" onClick={this.onClickShippingMethodSection.bind(this)}>Edit</a></div>;
    	}
    	
    	let selectedDeliveryOption = null;
    	if(this.state.orders.ordertype) {
    		selectedDeliveryOption = <div className="selected-option">Selection :- <i>{this.state.orders.ordertype}</i></div>;
    	}

    	let selectedDeliveryAddress = null;
    	if(this.state.orders.shippingaddress) {
    		selectedDeliveryAddress = <div className="selected-option">Selection :- <i>{this.state.orders.shippingaddress.address1}, {this.state.orders.shippingaddress.address2}, {this.state.orders.shippingaddress.city}, {this.state.orders.shippingaddress.zipcode}, {this.state.orders.shippingaddress.country}</i></div>;
    	}

    	let selectedShippingMethod = null;
    	if(this.state.orders.shippingmethod) {
    		selectedShippingMethod = <div className="selected-option">Selection :- <i>{this.state.orders.shippingmethod}</i></div>;
    	}

    	let checkoutContent = null;
    	if(this.state.responseReceived) {
    		checkoutContent = (
				<div className="row">
					<SideOrderSummary items={this.state.items} orders={this.state.orders}/>
					<div id="accordion" role="tablist" aria-multiselectable="true" className="col col-lg-8 col-md-12 col-sm-12 col-12 checkout-main">
			    		<div className="card">
					      <div className="card-header" role="tab" id="deliveryOption">
					         <h5 className="mb-0">
					         	<a className={this.state.option_href_css} data-toggle="collapse" data-parent="#accordion" id="deliveryOption-href" href="#option" aria-expanded={this.state.option_area_expanded} aria-controls="option">
					         		Delivery Option
					            </a>
					         	{deliveryOptionEditSection}
					         </h5>
					         {selectedDeliveryOption}
					      </div>
					      <div id="option" className={this.state.option_div_css} role="tabpanel" aria-labelledby="headingOption">
					      	{deliveryOptionComponent}
					      </div>
					    </div>
			    		<div className="card">
					      <div className="card-header" role="tab" id="deliveryMethod">
					         <h5 className="mb-0">
					            <a className={this.state.method_href_css} id="deliveryMethod-href" data-toggle="collapse" data-parent="#accordion" href="#method" aria-expanded={this.state.method_area_expanded} aria-controls="method">
					            	Delivery Address
					            </a>
					         	{deliveryMethodEditSection}
					         </h5>
					         {selectedDeliveryAddress}
					      </div>
			    		  <div id="method" className={this.state.method_div_css} role="tabpanel" aria-labelledby="deliveryMethod">
					      	{deliveryMethodComponent}
					      </div>
					    </div>
			    		<div className="card">
					      <div className="card-header" role="tab" id="shippingMethod">
					         <h5 className="mb-0">
					            <a className={this.state.shipping_href_css} id="deliveryMethod-href" data-toggle="collapse" data-parent="#accordion" href="#shipping" aria-expanded={this.state.shipping_area_expanded} aria-controls="shipping">
					            	Shipping Method
					            </a>
					            {shippingMethodEditSection}
					         </h5>
					         {selectedShippingMethod}
					      </div>
			    		  <div id="shipping" className={this.state.shipping_div_css} role="tabpanel" aria-labelledby="shippingMethod">
					      	{shippingMethodComponent}
					      </div>
					    </div>
					    <div className="card">
					      <div className="card-header" role="tab" id="paymentSection">
					         <h5 className="mb-0">
					            <a className={this.state.payment_href_css} data-toggle="collapse" id="payment-href" data-parent="#accordion" href="#payment" aria-expanded={this.state.payment_area_expanded} aria-controls="payment">
					            	Payment
					            </a>
					         </h5>
					      </div>
					      <div id="payment" className={this.state.payment_div_css} role="tabpanel" aria-labelledby="headerThree">
					         <Payment />
					      </div>
					    </div>
					</div>	
				</div>    				
    		);
    	}

	    return (
				<div>
					<CheckoutNavbar />
					<section>
						<div className="container">
							<Loader data={this.state.responseReceived}/>
							<header className="mb-5">
								<h2 className="heading-line">Checkout</h2>
							</header>
							{checkoutContent}
						</div>
					</section>
					<Footer />
				</div>
	    );
    }
}

export default withRouter(Checkout);