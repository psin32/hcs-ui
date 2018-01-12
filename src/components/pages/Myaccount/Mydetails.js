import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {withRouter} from "react-router-dom";
import Loader from '../common/Loader.js'

class Mydetails extends Component {

	constructor() {
		super();
		this.state = {
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
			responseReceived : false
		};
		document.title = "My Account | Details";
	}
	
	componentWillMount() {
		const cookies = new Cookies();
		const token = cookies.get('TOKEN');

	    const api = axios.create({
	    	headers: {'Authorization': 'Bearer '+token},
	    	withCredentials: true
	    });
	    
	    let selfAddressUrl = process.env.REACT_APP_USER_GET_SELFADDRESS_URL;
	    
	    api.get(selfAddressUrl)
	    .then((response) => {
	    	console.log(response.data);
            this.setState({
    			token : token,
    			responseReceived : true
            });	    	
            this.setState({
            	addressId : response.data.addressId,
            	title : response.data.title,
    			firstname : response.data.firstname,
    			lastname : response.data.lastname,
    			email1 : response.data.email1,
				address1 : response.data.address1,
				address2 : response.data.address2,
				address3 : response.data.address3,
				city : response.data.city,
				state : response.data.state,
				country : response.data.country,
				zipcode : response.data.zipcode,
				phone1 : response.data.phone1,
				addresstype : response.data.addresstype,
				isprimary : response.data.isprimary,
				selfaddress : response.data.selfaddress,
				status : response.data.status,
				email2 : response.data.email2,
				phone2 : response.data.phone2,
				nickname : response.data.nickname
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
	    const {userId, addressId, title, firstname, lastname, email1, address1, address2, address3, city, state, country, zipcode, phone1, addresstype, isprimary, selfaddress, status, email2, phone2, nickname} = this.state;

	    const api = axios.create({
	    	headers: {'Authorization': 'Bearer '+this.state.token},
	    	withCredentials: true
	    });	    
	    
	    let saveAddressUrl = process.env.REACT_APP_USER_POST_SAVE_ADDRESS_URL;
	    
	    api.patch(saveAddressUrl,
	    	{
	    	  "usersId": userId,
	    	  "address":{
	    	    "addressId" : addressId,
	    	    "addresstype": addresstype,
	    	    "status": status,
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
            this.setState({
            	addressId : response.data.addressId,
            	title : response.data.title,
    			firstname : response.data.firstname,
    			lastname : response.data.lastname,
    			email1 : response.data.email1,
				address1 : response.data.address1,
				address2 : response.data.address2,
				address3 : response.data.address3,
				city : response.data.city,
				state : response.data.state,
				country : response.data.country,
				zipcode : response.data.zipcode,
				phone1 : response.data.phone1,
				addresstype : response.data.addresstype,
				isprimary : response.data.isprimary,
				selfaddress : response.data.selfaddress,
				status : response.data.status,
				email2 : response.data.email2,
				phone2 : response.data.phone2,
				nickname : response.data.nickname,
				responseReceived : true
            });
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
    	
	    const {userId, addressId, title, firstname, lastname, email1, address1, address2, address3, city, state, country, zipcode, phone1, addresstype, isprimary, selfaddress, status, email2, phone2, nichname} = this.state;
	    return (
				<div className="col-lg-8">
					<Loader data={this.state.responseReceived}/>
				    <div id="updatemessage" style= {{display: 'none'}}>
						<div className="alert alert-success">
							<strong>Success!</strong> Your details updated successfully.
						</div>
				    </div>
					<div className="padding-top-2x mt-2 hidden-lg-up"></div>
					<h4>My Details</h4>
					<hr className="padding-bottom-1x"/>
					
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
						<div className="col-12 padding-top-1x">
							<hr className="margin-top-1x margin-bottom-1x"/>
							<div className="text-right">
								<input type="submit" value="Save" className="btn btn-primary margin-bottom-none" />
							</div>
						</div>
						<input type="hidden" id="addressId" name="addressId" value={addressId} />
					</form>
				</div>
	    );
    }
}

export default withRouter(Mydetails);