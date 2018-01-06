import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {withRouter} from "react-router-dom";
import Loader from '../common/Loader.js'
import jquery from 'jquery';

class AddAddress extends Component {

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
			addresstype : "",
			isprimary : 0,
			selfaddress : 0,
			status : "",
			email2 : "",
			phone2 : "",
			userId : "",
			token : "",
			shipping : false,
			billing : false,
			noaddress : false,
			newaddress : false,
			responseReceived : false,
			isGuestUser : false
		};
	}
	
	componentWillMount() {
		if(this.props.newaddress) {
			const cookies = new Cookies();
			const registerType = cookies.get('REGISTER_TYPE');
			if(registerType == 'G') {
	            this.setState({
	            	isGuestUser : true
	            });
			} else {
				this.fetchSelfAddress();
			}
		} else {
			const state = this.props.address;
			this.setState(state);
		}
		this.setState({
			noaddress : this.props.address.noaddress
        });
	}

	fetchSelfAddress() {
		const cookies = new Cookies();
		const token = cookies.get('TOKEN');

	    const api = axios.create({
	    	headers: {'Authorization': 'Bearer '+token},
	    	withCredentials: true
	    });
	    
	    let port = process.env.REACT_APP_USER_APP_PORT;
	    
	    let url = document.location.protocol + "//" +document.location.hostname + port +'/api/address/selfaddress';
	    
	    api.get(url)
	    .then((response) => {
            this.setState({
    			responseReceived : true
            });	    	
            this.setState({
            	title : response.data.title,
    			firstname : response.data.firstname,
    			lastname : response.data.lastname,
    			email1 : response.data.email1,
				phone1 : response.data.phone1
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
	
    onChange = (e) => {
	    const state = this.state
	    state[e.target.name] = e.target.value;
	    this.setState(state);
	}
	
	onSubmit = (e) => {
		
		this.setState({
			responseReceived : false
        });		

	    e.preventDefault();
	    
	    const {userId, address_id, title, firstname, lastname, email1, address1, address2, address3, city, state, country, zipcode, phone1, addresstype, isprimary, selfaddress, status, email2, phone2, nickname, shipping, billing} = this.state;

		const cookies = new Cookies();
		const token = cookies.get('TOKEN');

	    const api = axios.create({
	    	headers: {'Authorization': 'Bearer '+token},
	    	withCredentials: true
	    });
	    
	    let selectedAddressType = null;
        this.setState({
			shipping : true,
			billing : false
        });

        if(this.state.billing) {
        	selectedAddressType = "SB";
        } else {
        	selectedAddressType = "S";
        }
        
        let port = process.env.REACT_APP_USER_APP_PORT;

	    api.patch(document.location.protocol + "//" +document.location.hostname + port +'/api/address', 
	    	{
	    	  "usersId": userId,
	    	  "address":{
	    	    "addressId" : address_id,
	    	    "addresstype": selectedAddressType,
	    	    "status": "P",
	    	    "isprimary": isprimary,
	    	    "selfaddress": selfaddress,
	    	    "title": title,
	    	    "firstname": firstname,
	    	    "lastname": lastname,
	    	    "email1": email1,
	    	    "phone1": phone1,
	    	    "nickname": nickname,
	    	    "address1": address1,
	    	    "address2": address2,
	    	    "address3": address3,
	    	    "city": city,
	    	    "state": state,
	    	    "zipcode": zipcode,
	    	    "country": country
	    	  }
	    	}
	    )
	    .then((response) => {
	    	if (response.status === 200) {
	    		this.props.fetchAddresses(response.data.addressId);
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
    	
    	const {userId, address_id, title, firstname, lastname, email1, address1, address2, address3, city, state, country, zipcode, phone1, addresstype, isprimary, selfaddress, status, email2, phone2, shipping, billing} = this.state;
    	
	    let	formButton = (
		    	<div>
		    		{this.state.noaddress || this.state.isGuestUser ? null :
						<div style={{width: "50%", float : "left"}}>
							<a href="#" className="btn btn-secondary" onClick={this.props.cancel}>Cancel</a>
						</div>
		    		}
					<div className="text-right">
						<input type="hidden" id="addressId" name="addressId" value={address_id} />
						<input type="submit" value="Save" className="btn btn-primary" />
					</div>
				</div>
		);	    	
	    
	    return (
			<form className="row" onSubmit={(e) => {this.state.isGuestUser ? this.props.guestAddress(e, this.state) : this.onSubmit(e)}}>
				<div className="col-md-6">
					<div className="form-group">
						<label for="account-company">Title</label>
						<input className="form-control" type="text" id="title" name="title" value={title} onChange={this.onChange}/>
					</div>
				</div>
				<div className="col-md-6">
					<div className="form-group">
						<label for="account-company">Firstname</label>
						<input className="form-control" type="text" id="firstname" name="firstname" value={firstname} onChange={this.onChange}/>
					</div>
				</div>
				<div className="col-md-6">
					<div className="form-group">
						<label for="account-company">Lastname</label>
						<input className="form-control" type="text" id="lastname" name="lastname" value={lastname} onChange={this.onChange}/>
					</div>
				</div>
				<div className="col-md-6">
					<div className="form-group">
						<label for="account-company">Email Address</label>
						<input className="form-control" type="email" id="email" name="email1" value={email1} onChange={this.onChange}/>
					</div>
				</div>
				<div className="col-md-6">
					<div className="form-group">
						<label for="account-company">Mobile number</label>
						<input className="form-control" type="text" id="phone1" name="phone1" value={phone1} onChange={this.onChange}/>
					</div>
				</div>
				<div className="col-md-6">
					<div className="form-group">
						<label for="account-company">Address Line 1</label>
						<input className="form-control" type="text" id="line1" name="address1" value={address1} onChange={this.onChange}/>
					</div>
				</div>
				<div className="col-md-6">
					<div className="form-group">
						<label for="account-company">Address Line 2</label>
						<input className="form-control" type="text" id="line2" name="address2" value={address2} onChange={this.onChange}/>
					</div>
				</div>
				<div className="col-md-6">
					<div className="form-group">
						<label for="account-company">Address Line 3</label>
						<input className="form-control" type="text" id="line3" name="address3" value={address3} onChange={this.onChange}/>
					</div>
				</div>
				<div className="col-md-6">
					<div className="form-group">
						<label for="account-company">City</label>
						<input className="form-control" type="text" id="city" name="city" value={city} onChange={this.onChange}/>
					</div>
				</div>
				<div className="col-md-6">
					<div className="form-group">
						<label for="account-zip">ZIP Code</label>
						<input className="form-control" type="text" id="zipcode" name="zipcode" required="" value={zipcode} onChange={this.onChange}/>
					</div>
				</div>
				<div className="col-md-6">
					<div className="form-group">
						<label for="account-country">Country</label>
						<select className="form-control" id="account-country">
							<option selected>{country}</option>
						</select>
					</div>
				</div>
				<div className="col-12 pb-3">
					<label className="custom-control custom-checkbox d-block">
						<input className="custom-control-input" type="checkbox" name="billing" onChange={this.onChange}/><span className="custom-control-indicator"></span><span className="custom-control-description">Use this as Billing Address</span>
					</label>
					<hr className="margin-top-1x margin-bottom-1x"/>
					{formButton}
				</div>
			</form>
	    );
    }
}

export default withRouter(AddAddress);