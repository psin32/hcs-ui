import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {withRouter} from "react-router-dom";
import Loader from '../common/Loader.js'
import AddEditAddress from './AddEditAddress.js'

class DeliveryMethod extends Component {

	constructor() {
		super();
		this.state = {
		    data : [],
		    address_id : "",
			title : "",
			firstname : "",
			lastname : "",
			email1 : "",
			address1 : "",
			address2 : "",
			address3 : "",
			city : "",
			state : "",
			country : "",
			zipcode : "",
			phone1 : "",
			addresstype : "",
			isprimary : 0,
			selfaddress : 0,
			status : "",
			email2 : "",
			phone2 : "",
			nickname : "test",
			userId : "",
			token : "",
			shipping : false,
			billing : false,
			noaddress : false,
			newaddress : false,
			responseReceived : false,
			selectedAddressId : ''
		};
		this.onClickCancel = this.onClickCancel.bind(this);
		this.fetchAllShippingAddresses = this.fetchAllShippingAddresses.bind(this);
	}
	
	componentWillMount() {
		this.fetchAllShippingAddresses();
	}
	
	fetchAllShippingAddresses(addressId) {
		const cookies = new Cookies();
		const token = cookies.get('TOKEN');

	    const api = axios.create({
	    	headers: {'Authorization': 'Bearer '+token},
	    	withCredentials: true
	    });
	    
	    let getShippingAddressURL = process.env.REACT_APP_USER_APP_GET_SHIPPING_ADDRESS_URL;
	    
	    api.get(getShippingAddressURL)
	    .then((response) => {
            this.setState({
    			data : response.data,
    			responseReceived : true
            });	   
            if(response.data.length > 0) {
            	this.setState({
            		noaddress : false,
            		newaddress : false,
            		addeditaddress : false
                });
	            response.data.map((alldata, index) => {
	            	if(addressId && alldata.addressId == addressId) {
	    				this.setState({
	    					selectedAddressId : addressId
	    		        });
	            		this.setAddressData(alldata);
	            	} else if(this.props.orders.shippingaddress && alldata.addressId == this.props.orders.shippingaddress.address_id) {
	    				this.setState({
	    					selectedAddressId : this.props.orders.shippingaddress.address_id
	    		        });
	            		this.setAddressData(alldata);
	            	} else if(index == 0) {
	            		this.setAddressData(alldata)
	            	}
	      	    });
            } else {
            	this.setState({
            		noaddress : true,
            		newaddress : true,
            		addeditaddress : true
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
	
	handleChange (event) {
        this.state.data.map((alldata, index) => {
        	if(alldata.addressId == event.target.value) {
        		this.setAddressData(alldata)
        	}
  	    });
		this.setState({
			selectedAddressId : event.target.value
        });
    }
	
	setAddressData(alldata) {
    	const addressdata = {
    			address_id : alldata.addressId,
    			title : alldata.title,
    			firstname : alldata.firstname,
    			lastname : alldata.lastname,
    			email1 : alldata.email1,
				address1 : alldata.address1,
				address2 : alldata.address2,
				address3 : alldata.address3,
				city : alldata.city,
				state : alldata.state,
				country : alldata.country,
				zipcode : alldata.zipcode,
				phone1 : alldata.phone1,
				addresstype : alldata.addresstype,
				isprimary : alldata.isprimary,
				selfaddress : alldata.selfaddress,
				status : alldata.status,
				email2 : alldata.email2,
				phone2 : alldata.phone2,
				nickname : alldata.nickname
        };
        this.setState({
        	address_id : addressdata.address_id,
        	title : addressdata.title,
			firstname : addressdata.firstname,
			lastname : addressdata.lastname,
			email1 : addressdata.email1,
			address1 : addressdata.address1,
			address2 : addressdata.address2,
			address3 : addressdata.address3,
			city : addressdata.city,
			state : addressdata.state,
			country : addressdata.country,
			zipcode : addressdata.zipcode,
			phone1 : addressdata.phone1,
			addresstype : addressdata.addresstype,
			isprimary : addressdata.isprimary,
			selfaddress : addressdata.selfaddress,
			status : addressdata.status,
			email2 : addressdata.email2,
			phone2 : addressdata.phone2,
			nickname : addressdata.nickname
        });
	}
	
	newAddress() {
        this.setState({
        	newaddress : true,
        	address_id : "",
			title : "",
			firstname : "",
			lastname : "",
			email1 : "",
			address1 : "",
			address2 : "",
			address3 : "",
			city : "",
			state : "",
			country : "United Kingdom",
			zipcode : "",
			phone1 : "",
			addresstype : "SB",
			isprimary : 0,
			selfaddress : 0,
			status : "",
			email2 : "",
			phone2 : "",
			nickname : "test",
			shipping : false,
			billing : false,
        });
	}
	
	onClickAddAddress() {
        this.setState({
        	addeditaddress : true,
        	newaddress : true
        });		
	}

	onClickEditAddress() {
        this.setState({
        	addeditaddress : true,
        	newaddress : false
        });	
	}

	onClickCancel() {
        this.setState({
        	addeditaddress : false,
        	newaddress : false
        });		
	}
	
    render() {
    	
	    const addresses = this.state.data.map((alldata, index) => {
		      return (
		    		  <option key={ index } value={ alldata.addressId } >{ alldata.address1 }, { alldata.address2 }, { alldata.city }, { alldata.country }</option>
		      );
		});

	    const {userId, address_id, title, firstname, lastname, email1, address1, address2, address3, city, state, country, zipcode, phone1, addresstype, isprimary, selfaddress, status, email2, phone2, nickname, shipping, billing} = this.state;

	    let deliveryAddressSection = <AddEditAddress cancel={this.onClickCancel} address={this.state} newaddress={this.state.newaddress} fetchAddresses={this.fetchAllShippingAddresses}/>;
	    if(!this.state.addeditaddress) {
	    	deliveryAddressSection = (
    			<form onSubmit={(e) => this.props.onSubmit(e, this.state)} id="deliveryMethodForm">
	         		<div className="mb-2"><strong>Select Delivery Address:</strong></div>
	         		<select className="form-control" id="account-country" onChange={this.handleChange.bind(this)} value={this.state.selectedAddressId}>
		     			{addresses}
					</select>
					<div className="row address-section d-flex">
						<div className="col col-lg-4 col-md-4 col-sm-12 col-12">
							<strong>Address:</strong>
						</div>					
						<div className="col col-lg-8 col-md-8 col-sm-12 col-12">
							{title} {firstname} {lastname},<br/>
							{address1}, {address2} <br/>
							{city}, {zipcode}, {country}<br/>
							<a href="#" className="address-link" onClick={this.onClickEditAddress.bind(this)}>Edit address</a>
							<a href="#" className="address-link" onClick={this.onClickAddAddress.bind(this)}>Add New</a>
						</div>
					</div>
					<input type="hidden" id="address_id" name="address_id" value={address_id} />
					<input type="hidden" id="title" name="title" value={title} />
					<input type="hidden" id="firstname" name="firstname" value={firstname} />
					<input type="hidden" id="lastname" name="lastname" value={lastname} />
					<input type="hidden" id="address1" name="address1" value={address1} />
					<input type="hidden" id="address2" name="address2" value={address2} />
					<input type="hidden" id="address3" name="address3" value={address3} />
					<input type="hidden" id="city" name="city" value={city} />
					<input type="hidden" id="state" name="state" value={state} />
					<input type="hidden" id="country" name="country" value={country} />
					<input type="hidden" id="email1" name="email1" value={email1} />
					<input type="hidden" id="phone1" name="phone1" value={phone1} />
					<input type="hidden" id="addresstype" name="addresstype" value={addresstype} />
					<input type="submit" value="Continue to select shipping" className="btn btn-unique mt-3 mb-3"/>
				</form>
	    	);
	    }
    	return (
	         <div className="card-block">
	         	{deliveryAddressSection}
	         </div>
	    );
    }
}

export default withRouter(DeliveryMethod);