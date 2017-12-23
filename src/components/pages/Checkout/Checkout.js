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
import jquery from 'jquery';

class Checkout extends Component {

	constructor() {
		super();
		this.state = {
		    data : [],
		    basketTotal : 0,
		    emptyBasket : false,
			responseReceived : false,
			subtotal : 0,
			ordertotal : 0,
			shippingcharges : 0,
			totaldiscount : 0,
			ordertype : '',
			shippingaddress : '',
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
			payment_area_expanded : false
		};
		this.onSubmitDeliveryOption = this.onSubmitDeliveryOption.bind(this);
		this.onSubmitDeliveryMethod = this.onSubmitDeliveryMethod.bind(this);
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
    			data : response.data.items,
    			responseReceived : true,
    			subtotal : response.data.subtotal,
    			ordertotal : response.data.ordertotal,
    			totaldiscount : response.data.totaldiscount,
    			shippingcharges : response.data.shippingcharges,
    			ordertype : response.data.ordertype,
    			shippingaddress : response.data.shippingaddress
            });
        	if(this.state.ordertype == 'HOME') {
        		this.setState({
        			showDeliveryMethod: true,
        			showShippingMethod: false,
        			showPayment: false,
        			option_href_css : 'collapsed',
        			method_href_css : '',
        			shipping_href_css : 'collapsed disabled-link',
        			payment_href_css : 'collapsed disabled-link',
    				option_div_css : 'collapse mt-3 ml-3 mr-3',
    				method_div_css : 'collapse show mt-3 ml-3 mr-3',
    				shipping_div_css : 'collapse mt-3 ml-3 mr-3',
    				payment_div_css : 'collapse',
    				option_area_expanded : false,
    				method_area_expanded : true,
    				shipping_area_expanded : false,
    				payment_area_expanded : false
        		});
        	}
        	if(this.state.shippingaddress) {
        		this.setState({
        			showDeliveryMethod: true,
        			showShippingMethod: true,
        			showPayment: false,
        			option_href_css : 'collapsed',
        			method_href_css : 'collapsed',
        			shipping_href_css : '',
        			payment_href_css : 'collapsed disabled-link',
    				option_div_css : 'collapse mt-3 ml-3 mr-3',
    				method_div_css : 'collapse mt-3 ml-3 mr-3',
    				shipping_div_css : 'collapse show mt-3 ml-3 mr-3',
    				payment_div_css : 'collapse',
    				option_area_expanded : false,
    				method_area_expanded : false,
    				shipping_area_expanded : true,
    				payment_area_expanded : false
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
					this.setState({
	        			showDeliveryMethod: true,
	        			showShippingMethod: false,
	        			showPayment: false,
						option_href_css : 'collapsed',
						method_href_css : '',
						shipping_href_css : 'collapsed disabled-link',
						payment_href_css : 'collapsed disabled-link',
						option_div_css : 'collapse mt-3 ml-3 mr-3',
						method_div_css : 'collapse show mt-3 ml-3 mr-3',
						shipping_div_css : 'collapse mt-3 ml-3 mr-3',
						payment_div_css : 'collapse',
						option_area_expanded : false,
						method_area_expanded : true,
						shipping_area_expanded : false,
						payment_area_expanded : false
			        });
		    	}
			})
			.catch((error) => {
		    	if (error.response) {
					this.setState({
						responseReceived : true
			        });		
			    	if(error.response.status === 403) {
			    		if (null == this.state.token) {
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
	    			shippingaddress : response.data.shippingaddress
	    		});
				this.setState({
					showDeliveryMethod: true,
					showShippingMethod: true,
					showPayment: false,
					option_href_css : 'collapsed',
					method_href_css : 'collapsed',
					shipping_href_css : '',
					payment_href_css : 'collapsed',
					option_div_css : 'collapse mt-3 ml-3 mr-3',
					method_div_css : 'collapse mt-3 ml-3 mr-3',
					shipping_div_css : 'collapse show mt-3 ml-3 mr-3',
					payment_div_css : 'collapse disabled-link',
					option_area_expanded : false,
					method_area_expanded : false,
					shipping_area_expanded : true,
					payment_area_expanded : false
		        });
	    	}
		})
		.catch((error) => {
	    	if (error.response) {
				this.setState({
					responseReceived : true
		        });		
		    	if(error.response.status === 403) {
		    		if (null == this.state.token) {
		    			this.props.history.push("/clearcookie#accessdenied");
		    		} else {
		    			this.props.history.push("/clearcookie#timeout");	
		    		}
		    	}
	    	}
		}); 		
	}
	
    render() {
    	let deliveryOptionComponent = <DeliveryOption option={this.state.ordertype} onSubmit={this.onSubmitDeliveryOption} />;

    	let deliveryMethodComponent = null;
    	if(this.state.showDeliveryMethod) {
    		deliveryMethodComponent = <DeliveryMethod onSubmit={this.onSubmitDeliveryMethod} shippingaddress={this.state.shippingaddress}/>;
    	}
    	
    	let shippingMethodComponent = null;
    	if(this.state.showShippingMethod) {
    		shippingMethodComponent = <ShippingMethod onSubmit={this.onSubmitDeliveryMethod} shippingaddress={this.state.shippingaddress}/>;
    	}

    	let checkoutContent = null;
    	if(this.state.responseReceived) {
    		checkoutContent = (
				<div className="row">
					<SideOrderSummary data={this.state.data} subtotal={this.state.subtotal} shippingcharges={this.state.shippingcharges} ordertotal={this.state.ordertotal} />
					<div id="accordion" role="tablist" aria-multiselectable="true" className="col col-lg-8 col-md-12 col-sm-12 col-12 checkout-main">
			    		<div className="card">
					      <div className="card-header" role="tab" id="deliveryOption">
					         <h5 className="mb-0">
					         	<a className={this.state.option_href_css} data-toggle="collapse" data-parent="#accordion" id="deliveryOption-href" href="#option" aria-expanded={this.state.option_area_expanded} aria-controls="option">
					         		Delivery Option
					            </a>
					         </h5>
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
					         </h5>
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
					         </h5>
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
					         <div className="card-block">
					            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
					         </div>
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