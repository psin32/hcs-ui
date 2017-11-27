import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {withRouter} from "react-router-dom";

class Myaddress extends Component {

	constructor() {
		super();
		this.state = {
		    data : [],
		    addressId : "",
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
			isprimary : "",
			selfaddress : "",
			status : "",
			email2 : "",
			phone2 : "",
			nickname : "",
			userId : "",
			token : "",
			shipping : false,
			billing : false
		};
	}
	
	componentDidMount() {
		const cookies = new Cookies();
		const token = cookies.get('TOKEN');
		const userId = cookies.get('USER_ID');

	    const api = axios.create({
	    	headers: {'Authorization': 'Bearer '+token},
	    	withCredentials: true
	    });
	    
	    api.get('http://localhost:8080/address/'+userId)
	    .then((response) => {
            this.setState({
    			data : response.data,
    			userId : userId,
    			token : token
            });	    	
            response.data.map((alldata, index) => {
            	if(index == 0) {
    	        	const addressdata = {
    	        			addressId : alldata.addressId,
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
    	            	addressId : addressdata.addressId,
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
    	            if(addressdata.addresstype == 'S') {
        	            this.setState({
    	    				shipping : true,
    	    				billing : false
        	            });
    	            }	      
    	            if(addressdata.addresstype == 'B') {
        	            this.setState({
        	            	shipping : false,
        	            	billing : true
        	            });
    	            }
    	            if(addressdata.addresstype == 'SB') {
        	            this.setState({
        	            	shipping : true,
    	    				billing : true
        	            });
    	            }
            	}
      	    });            
	    })
	    .catch((error) => {
	    	if (error.response) {
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
    	document.getElementById("updatemessage").style.display = "none";
        this.state.data.map((alldata, index) => {
        	if(alldata.addressId == event.target.value) {
	        	const addressdata = {
	        			addressId : alldata.addressId,
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
	            	addressId : addressdata.addressId,
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
	            if(addressdata.addresstype == 'S') {
    	            this.setState({
	    				shipping : true,
	    				billing : false
    	            });
	            }	      
	            if(addressdata.addresstype == 'B') {
    	            this.setState({
    	            	shipping : false,
    	            	billing : true
    	            });
	            }
	            if(addressdata.addresstype == 'SB') {
    	            this.setState({
    	            	shipping : true,
	    				billing : true
    	            });
	            }
        	}
  	    });
    }
    
    onChange = (e) => {
	    const state = this.state
	    state[e.target.name] = e.target.value;
	    if(e.target.name == 'shipping' || e.target.name == 'billing') {
	    	state[e.target.name] = e.target.checked;
	    }
	    this.setState(state);
	}
    
	onSubmit = (e) => {
	    e.preventDefault();
	    const {userId, addressId, title, firstname, lastname, email1, address1, address2, address3, city, state, country, zipcode, phone1, addresstype, isprimary, selfaddress, status, email2, phone2, nickname, shipping, billing} = this.state;

	    const api = axios.create({
	    	headers: {'Authorization': 'Bearer '+this.state.token},
	    	withCredentials: true
	    });	    
	    api.post('http://localhost:8080/address/update', 
	    	{
	    	  "usersId": userId,
	    	  "address":{
	    	    "addressId" : addressId,
	    	    "addresstype": addresstype,
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
	    		document.getElementById("updatemessage").style.display = "block";
	    	}

            response.data.map((alldata, index) => {
            	if(index == 0) {
    	        	const addressdata = {
    	        			addressId : alldata.addressId,
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
    	            	addressId : addressdata.addressId,
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
    	            if(addressdata.addresstype == 'S') {
        	            this.setState({
    	    				shipping : true,
    	    				billing : false
        	            });
    	            }	      
    	            if(addressdata.addresstype == 'B') {
        	            this.setState({
        	            	shipping : false,
        	            	billing : true
        	            });
    	            }
    	            if(addressdata.addresstype == 'SB') {
        	            this.setState({
        	            	shipping : true,
    	    				billing : true
        	            });
    	            }
            	}
      	    });  
	    })
	    .catch((error) => {
	    	if (error.response) {
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
    	
	    const addresses = this.state.data.map((alldata, index) => {
	      return (
	    		  <option key={ index } value={ alldata.addressId }>{ alldata.address1 }, { alldata.address2 }, { alldata.city }, { alldata.country }</option>
	      );
	    });
	    const {userId, addressId, title, firstname, lastname, email1, address1, address2, address3, city, state, country, zipcode, phone1, addresstype, isprimary, selfaddress, status, email2, phone2, nickname, shipping, billing} = this.state;
	    return (
				<div className="col-lg-8">
				    <div id="updatemessage" style= {{display: 'none'}}>
						<div className="alert alert-success">
							<strong>Success!</strong> Your address is successfully updated
						</div>
				    </div>
					<div className="padding-top-2x mt-2 hidden-lg-up"></div>
					<h4>Address</h4>
					<hr className="padding-bottom-1x"/>
					<div className="row">
						<div className="col-md-12">
							<div className="form-group">
								<label for="account-country">Address</label>
								<select className="form-control" id="account-country" onChange={this.handleChange.bind(this)}>
									{addresses}
								</select>
							</div>
						</div>	
					</div>
					<form className="row" onSubmit={this.onSubmit}>
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
								<label for="account-company">city</label>
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
									<option>Australia</option>
									<option>Canada</option>
									<option>France</option>
									<option>Germany</option>
									<option>Switzerland</option>
									<option>United States</option>
									<option selected>{country}</option>
								</select>
							</div>
						</div>
						<div className="col-12 padding-top-1x">
							<h4>Address Type</h4>
							<hr className="padding-bottom-1x"/>
							<label className="custom-control custom-checkbox d-block">
								<input className="custom-control-input" type="checkbox" checked={shipping ? 'checked': null} defaultChecked={shipping} ref="shipping" name="shipping" onChange={this.onChange}/><span className="custom-control-indicator"></span><span className="custom-control-description">Shipping Address</span>
							</label>
							<label className="custom-control custom-checkbox d-block">
								<input className="custom-control-input" type="checkbox" checked={billing ? 'checked': null} defaultChecked={billing} ref="billing" name="billing" onChange={this.onChange}/><span className="custom-control-indicator"></span><span className="custom-control-description">Billing Address</span>
							</label>
							<hr className="margin-top-1x margin-bottom-1x"/>
							<div className="text-right">
								<input type="submit" value="Save" className="btn btn-primary margin-bottom-none" />
							</div>
						</div>
						<input type="hidden" id="userId" name="userId" value={userId} />
						<input type="hidden" id="addressId" name="addressId" value={addressId} />
					</form>
				</div>
	    );
    }
}

export default withRouter(Myaddress);