import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {withRouter} from "react-router-dom";
import Loader from '../common/Loader.js'

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
			userId : "",
			token : "",
			shipping : false,
			billing : false,
			noaddress : false,
			newaddress : false,
			responseReceived : false
		};
	}
	
	componentWillMount() {
		this.fetchAllShippingAddresses();
	}
	
	fetchAllShippingAddresses() {
		const cookies = new Cookies();
		const token = cookies.get('TOKEN');

	    const api = axios.create({
	    	headers: {'Authorization': 'Bearer '+token},
	    	withCredentials: true
	    });
	    
	    let getShippingAddressURL = process.env.REACT_APP_ORDER_APP_GET_SHIPPING_ADDRESS_URL;
	    
	    api.get(getShippingAddressURL)
	    .then((response) => {
            this.setState({
    			data : response.data,
    			responseReceived : true
            });	   
            if(response.data.length > 0) {
            	this.setState({
            		noaddress : false,
            		newaddress : false
                });
	            response.data.map((alldata, index) => {
	            	if(index == 0) {
	            		this.setAddressData(alldata)
	            	}
	      	    });
            } else {
            	this.setState({
            		noaddress : true
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
		console.log(event.target.value);
        this.state.data.map((alldata, index) => {
        	if(alldata.address_id == event.target.value) {
        		this.setAddressData(alldata)
        	}
  	    });
    }
	
	setAddressData(alldata) {
    	const addressdata = {
    			address_id : alldata.address_id,
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
	
    render() {
	    const addresses = this.state.data.map((alldata, index) => {
		      return (
		    		  <option key={ index } value={ alldata.address_id }>{ alldata.address1 }, { alldata.address2 }, { alldata.city }, { alldata.country }</option>
		      );
		});

	    const {userId, address_id, title, firstname, lastname, email1, address1, address2, address3, city, state, country, zipcode, phone1, addresstype, isprimary, selfaddress, status, email2, phone2, nickname, shipping, billing} = this.state;

    	return (
	         <div className="card-block">
	         	<form onSubmit={this.props.onSubmit.bind(this)}>
	         		<select className="form-control" id="account-country" onChange={this.handleChange.bind(this)}>
	         			{addresses}
					</select>
					<div className="ml-5 mt-3 mb-5">
						{title} {firstname} {lastname},<br/>
						{address1},<br/>
						{address2},<br/>
						{address3},<br/>
						{city},<br/>
						{zipcode},<br/>
						{country}
					</div>
					<input type="submit" value="Next" className="btn btn-unique mt-3 mb-3"/>
				</form>
	         </div>
	    );
    }
}

export default withRouter(DeliveryMethod);