import React, { Component } from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";
import Loader from '../pages/common/Loader.js'
import Cookies from 'universal-cookie';

class LoginForm extends Component {
	
    constructor() {
        super();
        this.state = {
          email: '',
          password: '',
          incorrectLoginError : false,
          responseReceived : true
        };
    }
    
	onChange = (e) => {
	    const state = this.state
	    state[e.target.name] = e.target.value;
	    this.setState(state);
	}

	onSubmit = (e) => {
		const cookies = new Cookies();
		const guestToken = cookies.get('TOKEN');

		this.setState({
        	responseok : false
        });		
	    e.preventDefault();
	    const { email, password} = this.state;

	    const api = axios.create({
	    	withCredentials: true
	    });
	    
	    let port = process.env.REACT_APP_USER_APP_PORT;
	    
	    api.post(document.location.protocol + "//" +document.location.hostname + port +'/login', 
	    	{
	    	    "username": email,
	    	    "password": password
	    	}
	    )
	    .then((response) => {
			this.setState({
				responseReceived : true
	        });		
	    	if (response.status === 200) {
	    		this.fetchBasket(guestToken);
	    	}
	    })
	    .catch((error) => {
			this.setState({
				responseReceived : true
	        });		
	    	if (error.response) {
		    	if(error.response.status === 401) {
		    		document.getElementById("errormessage").style.display = "block";
		    	}
	    	}
	    }); 
	}
	
	fetchBasket(guestToken) {
		const cookies = new Cookies();
		const token = cookies.get('TOKEN');

		let api = null;
		if(guestToken) {
		    api = axios.create({
		    	headers: {'Authorization': 'Bearer '+token, 'Token' : guestToken},
		    	withCredentials: true
		    });
		} else {
		    api = axios.create({
		    	headers: {'Authorization': 'Bearer '+token},
		    	withCredentials: true
		    });
		}
	    
	    let basketURL = process.env.REACT_APP_BASKET_APP_GET_CURRENT_BASKET_URL;
	    
	    api.get(basketURL)
	    .then((response) => {
	    	if(response.data.items != null) {
	    		this.props.history.push("/basket");
	    	} else {
	    		this.props.history.push("/myaccount#details");
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

	render() {
		const { title, firstname, lastname, email, password, confirmpassword} = this.state;

	    return (
	    	  <div className="col-md-12">
	    	 	  <Loader data={this.state.responseReceived}/>
	    	  	  <div id="errormessage" style= {{display: 'none'}}>
			    	  <div className="alert alert-danger">
						  <strong>ERROR!</strong> Username and password does not match.
				      </div>
				  </div>
		          <form id="contact-form"  onSubmit={this.onSubmit} className="custom-form form">
		              <div className="controls">
		                    <div className="form-group">
		                      <label for="username">Username *</label>
		                      <input type="text" name="email" id="email" placeholder="Enter your username" required="required" className="form-control" value={email} onChange={this.onChange} />
		                    </div>
			                  <div className="form-group">
			                    <label for="password">Password *</label>
			                    <input type="password" name="password" id="password" placeholder="Enter your password" required="required" className="form-control" value={password} onChange={this.onChange} />
			                  </div>
		                <input type="submit" value="Login" className="btn btn-unique"/>
		              </div>
		          </form>
	          </div>
	    );
	}
}

export default withRouter(LoginForm);