import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {withRouter} from "react-router-dom";
import Loader from '../common/Loader.js'
import jquery from 'jquery';

class Payment extends Component {

	constructor() {
		super();
		this.state = {
			paypalStyle : 'paypal-section section--active',
			cardStyle : 'card-section',
			paypalSection : 'col col-lg-12 col-md-12 col-sm-12 col-12 paypal-panel',
			cardSection : 'col col-lg-12 col-md-12 col-sm-12 col-12 card-panel payment-hidden',
			responseReceived : true,
			tandc : '',
			globalCollectIframeURL : '',
			cardDetails: []
		};
	}
	
	componentWillMount() {
	}

    onChange = (e) => {
	    const state = this.state
	    state[e.target.name] = e.target.value;
	    this.setState(state);
	}
    
    onSubmitPaypal(event) {
		event.preventDefault();
		let termsandcondition = this.state.tandc;
		if(termsandcondition == "on") {
			this.setState({
				responseReceived : false
	        });
			const cookies = new Cookies();
			const token = cookies.get('TOKEN');
	
		    const api = axios.create({
		    	headers: {'Authorization': 'Bearer '+token},
		    	withCredentials: true
		    });
	
		    let paypalPaymentURL = process.env.REACT_APP_ORDER_APP_GET_CREATE_PAYPAL_PAYMENT_URL;
		    
		    api.post(paypalPaymentURL)
			.then((response) => {
				this.setState({
					responseReceived : true
		        });
		    	if (response.status === 200) {
					console.log(response.data);
					window.location.assign(response.data);
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
			document.getElementById("errormessage-payment").style.display = "block";
			jquery('#errormessage-payment').delay(3000).hide(1000);
		}
	}
	
	onClickPaypalSection() {
        this.setState({
			paypalStyle : 'paypal-section section--active',
			cardStyle : 'card-section',
			paypalSection : 'col col-lg-12 col-md-12 col-sm-12 col-12 paypal-panel',
			cardSection : 'col col-lg-12 col-md-12 col-sm-12 col-12 card-panel payment-hidden'
        });
	}
	
	onClickCardSection() {
		this.setState({
			responseReceived : false
        });
		const cookies = new Cookies();
		const token = cookies.get('TOKEN');

	    const api = axios.create({
	    	headers: {'Authorization': 'Bearer '+token},
	    	withCredentials: true
	    });

	    let globalCollectSavedCards = process.env.REACT_APP_PAYMENT_APP_GET_CARDS_URL;
	    
	    api.post(globalCollectSavedCards)
		.then((response) => {
			this.setState({
				responseReceived : true
	        });
	    	if (response.status === 200) {
	    		
	    		if(response.data.length === 0) {
	    			this.createGlobalCollectIframe();
	    		} else {
	    			this.setState({
	    				cardDetails : response.data
	    	        });
	    		}
	    	}
			this.setState({
				paypalStyle : 'paypal-section',
				cardStyle : 'card-section section--active',
				paypalSection : 'col col-lg-12 col-md-12 col-sm-12 col-12 paypal-panel payment-hidden',
				cardSection : 'col col-lg-12 col-md-12 col-sm-12 col-12 card-panel'
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
	
	savedCardIFrame() {
		this.createGlobalCollectIframe(document.getElementById("saved-cards").value);
	}

	createGlobalCollectIframe(cardId) {
		
		this.setState({
			responseReceived : false
        });
		const cookies = new Cookies();
		const token = cookies.get('TOKEN');

	    const api = axios.create({
	    	headers: {'Authorization': 'Bearer '+token},
	    	withCredentials: true
	    });

	    let globalCollectPaymentURL = process.env.REACT_APP_ORDER_APP_POST_CREATE_GLOBALCOLLECT_PAYMENT_URL;
	    if(cardId) {
	    	globalCollectPaymentURL = process.env.REACT_APP_ORDER_APP_POST_CREATE_GLOBALCOLLECT_PAYMENT_URL+"/"+cardId;
	    }
	    
	    api.post(globalCollectPaymentURL)
		.then((response) => {
			this.setState({
				responseReceived : true
	        });
	    	if (response.status === 200) {
	    		this.setState({
	    			globalCollectIframeURL : response.data
		        });
	    	}
			this.setState({
				paypalStyle : 'paypal-section',
				cardStyle : 'card-section section--active',
				paypalSection : 'col col-lg-12 col-md-12 col-sm-12 col-12 paypal-panel payment-hidden',
				cardSection : 'col col-lg-12 col-md-12 col-sm-12 col-12 card-panel'
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
	
    render() {
    	
    	let cardContent = null;
    	if(this.state.cardDetails) {
    		
    		const cards = this.state.cardDetails.map((alldata, index) => {
    			return (
    				<option key={ index } value={ alldata.cardId }>{ alldata.cardNumber }, { alldata.expiryDate }, { alldata.cardType }</option>
  		      	);
    		});

    		cardContent = (
				<div className={this.state.cardSection}>
					<div className="mt-5 text-left"><strong>Saved Cards:</strong></div>
					<select className="form-control mt-2" id="saved-cards" name="saved-cards">
						{cards}
					</select>
					<div className="row">
						<div className="col col-lg-6 col-md-6 col-sm-12 col-12 text-right-button">
							<button className="btn btn-unique mt-3 mb-3" onClick={this.savedCardIFrame.bind(this)}>Pay using this card</button>
						</div>
						<div className="col col-lg-6 col-md-6 col-sm-12 col-12 text-left-button">
							<button className="btn btn-unique mt-3 mb-3" onClick={this.createGlobalCollectIframe.bind(this)}>Pay using new card</button>
						</div>
					</div>
				</div>
    		);
    	}

    	if(this.state.globalCollectIframeURL) {
    		cardContent = (
				<div className={this.state.cardSection}>
					<iframe src={this.state.globalCollectIframeURL} className="gc-iframe"></iframe>
				</div>
    		);
    	}

	    return (
	         <div className="card-block">
	         	<Loader data={this.state.responseReceived} fullscreen="true"/>
	         	<div className="m-2"><strong>Select Payment option below:</strong></div>
	         	<div className="row d-flex payment-types p-2">
					<div className="col col-lg-6 col-md-6 col-sm-6 col-6" onClick={this.onClickPaypalSection.bind(this)}>
						<div className={this.state.paypalStyle}>
							<img src="img/paypal-full.png" className="paypal-logo" />
						</div>
					</div>					
					<div className="col col-lg-6 col-md-6 col-sm-6 col-6" onClick={this.onClickCardSection.bind(this)}>
						<div className={this.state.cardStyle}>
							<img src="img/cards.png" className="card-logo" />
						</div>
					</div>
	            </div>
	            <div className="row p-4 payment-types">
					<div className={this.state.paypalSection}>
						<form onSubmit={this.onSubmitPaypal.bind(this)}>
							<div>
								<div id="errormessage-payment" style= {{display: 'none'}}>
									<div className="alert alert-danger">
										<strong>ERROR!</strong> Please select Terms and Condition below.
									</div>
								</div>
								<input type="checkbox" ref="tandc" name="tandc" onChange={this.onChange}/>
								<label className="t-and-c">I accept the Terms and Conditions of use.</label>
							</div>
	                        <div className="m-3">
	                            <button id="payment-button" type="submit" className="btn btn-unique btn-lg btn-info">
	                                <i className="fa fa-lock fa-lg"></i>&nbsp;
	                                <span id="payment-button-amount">Pay £{this.props.orders.formattedOrdertotal}</span>
	                            </button>
	                        </div>
						</form>
					</div>					
					{cardContent}
	            </div>	            
	         </div>
	    );
    }
}

export default withRouter(Payment);