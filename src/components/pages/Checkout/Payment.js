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
			tandc : ''
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
			paypalStyle : 'paypal-section',
			cardStyle : 'card-section section--active',
			paypalSection : 'col col-lg-12 col-md-12 col-sm-12 col-12 paypal-panel payment-hidden',
			cardSection : 'col col-lg-12 col-md-12 col-sm-12 col-12 card-panel'
        });
	}
	
    render() {
	    return (
	         <div className="card-block">
	         	<Loader data={this.state.responseReceived}/>
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
	                                <span id="payment-button-amount">Pay £{this.props.orders.ordertotal}</span>
	                            </button>
	                        </div>
						</form>
					</div>					
					<div className={this.state.cardSection}>
						<div className="container-fluid py-3">
						    <div className="row">
						        <div className="col-12 col-sm-12 col-md-12 col-lg-12 mx-auto text-left">
						            <div id="pay-invoice" className="card">
						                <div className="card-body">
						                    <form action="" method="post" novalidate="novalidate">
						                        <div className="form-group text-center">
						                            <ul className="list-inline">
						                                <li className="list-inline-item"><i className="text-muted fa fa-cc-visa fa-2x"></i></li>
						                                <li className="list-inline-item"><i className="fa fa-cc-mastercard fa-2x"></i></li>
						                                <li className="list-inline-item"><i className="fa fa-cc-amex fa-2x"></i></li>
						                                <li className="list-inline-item"><i className="fa fa-cc-discover fa-2x"></i></li>
						                            </ul>
						                        </div>
						                        <div className="form-group has-success">
						                            <label for="cc-name" className="control-label mb-1">Name on card</label>
						                            <input id="cc-name" name="cc-name" type="text" className="form-control cc-name valid" data-val="true" data-val-required="Please enter the name on card" autocomplete="cc-name" aria-required="true" aria-invalid="false" aria-describedby="cc-name-error" />
						                            <span className="help-block field-validation-valid" data-valmsg-for="cc-name" data-valmsg-replace="true"></span>
						                        </div>
						                        <div className="form-group">
						                            <label for="cc-number" className="control-label mb-1">Card number</label>
						                            <input id="cc-number" name="cc-number" type="tel" className="form-control cc-number identified visa" value="" data-val="true" data-val-required="Please enter the card number" data-val-cc-number="Please enter a valid card number" autocomplete="cc-number" />
						                            <span className="help-block" data-valmsg-for="cc-number" data-valmsg-replace="true"></span>
						                        </div>
						                        <div className="row">
						                            <div className="col-6">
						                                <div className="form-group">
						                                    <label for="cc-exp" className="control-label mb-1">Expiration</label>
						                                    <input id="cc-exp" name="cc-exp" type="tel" className="form-control cc-exp" value="" data-val="true" data-val-required="Please enter the card expiration" data-val-cc-exp="Please enter a valid month and year" placeholder="MM / YY" autocomplete="cc-exp" />
						                                    <span className="help-block" data-valmsg-for="cc-exp" data-valmsg-replace="true"></span>
						                                </div>
						                            </div>
						                            <div className="col-6">
						                                <label for="x_card_code" className="control-label mb-1">CVV</label>
						                                <div className="input-group">
						                                    <input id="x_card_code" name="x_card_code" type="tel" className="form-control cc-cvc" value="" data-val="true" data-val-required="Please enter the security code" data-val-cc-cvc="Please enter a valid security code" autocomplete="off" />
						                                    <div className="input-group-addon">
						                                        <span className="fa fa-question-circle fa-lg" data-toggle="popover" data-container="body" data-html="true" data-title="Security Code" 
						                                        data-content="<div className='text-center one-card'>The 3 digit code on back of the card..<div className='visa-mc-cvc-preview'></div></div>"
						                                        data-trigger="hover"></span>
						                                    </div>
						                                </div>
						                            </div>
						                        </div>
						                        <div style={{textAlign : "center"}}>
						                            <button id="payment-button" type="submit" className="btn btn-unique btn-lg btn-info">
						                                <i className="fa fa-lock fa-lg"></i>&nbsp;
						                                <span id="payment-button-amount">Pay £{this.props.orders.ordertotal}</span>
						                            </button>
						                        </div>
						                    </form>
						                </div>
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

export default withRouter(Payment);