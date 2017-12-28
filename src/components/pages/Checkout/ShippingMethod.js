import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {withRouter} from "react-router-dom";
import Loader from '../common/Loader.js'

class ShippingMethod extends Component {

	constructor() {
		super();
		this.state = {
		    data : [],
			responseReceived : false
		};
	}
	
	componentWillMount() {
		this.fetchAllShippingMethods();
	}
	
	fetchAllShippingMethods() {
		const cookies = new Cookies();
		const token = cookies.get('TOKEN');

	    const api = axios.create({
	    	headers: {'Authorization': 'Bearer '+token},
	    	withCredentials: true
	    });
	    
	    let getShippingMethodURL = process.env.REACT_APP_ORDER_APP_GET_SHIPPING_METHOD_URL;
	    
	    api.get(getShippingMethodURL)
	    .then((response) => {
            this.setState({
    			data : response.data,
    			responseReceived : true
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
	    const shippingMethods = this.state.data.map((alldata, index) => {
		      return (
					<div className="radio row address-section d-flex" key={ index }>
						<div className="col col-lg-8 col-md-8 col-sm-8 col-8">
							<input type="radio" name="shippingmethod" id={ alldata.name } value={ alldata.name } checked={alldata.name === this.props.orders.shippingmethod} onClick={this.props.onClick} />
							<label className="ml-2">{ alldata.description }</label>
						</div>					
						<div className="col col-lg-4 col-md-4 col-sm-4 col-4">
							<strong>£{alldata.amount}</strong>
						</div>
					</div>
		      );
		});
    	
    	return (
	         <div className="card-block">
				<div id="errormessage" style= {{display: 'none'}}>
					<div className="alert alert-danger">
						<strong>ERROR!</strong> Please select option below.
					</div>
				</div>
	         
	         	<div className="mb-2"><strong>Select Shipping Method:</strong></div>
	         	<form onSubmit={(e) => this.props.onSubmit(e, this.state)} id="deliveryMethodForm">
						{shippingMethods}
					<input type="submit" value="Continue to payment" className="btn btn-unique mt-3 mb-3"/>
				</form>
	         </div>
	    );
    }
}

export default withRouter(ShippingMethod);