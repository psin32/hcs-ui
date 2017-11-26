import React, { Component } from 'react';
import axios from 'axios';

class LoginForm extends Component {
	
    constructor() {
        super();
        this.state = {
          email: '',
          password: ''
        };
    }
    
	onChange = (e) => {
	    const state = this.state
	    state[e.target.name] = e.target.value;
	    this.setState(state);
	}

	onSubmit = (e) => {
	    e.preventDefault();
	    const { email, password} = this.state;

	    const api = axios.create({
	    	withCredentials: true
	    });
	    
	    api.post('http://localhost:8080/login', 
	    	{
	    	    "username": email,
	    	    "password": password
	    	}
	    )
	    .then((response) => {
	    	console.log(response.status);
	    	console.log(response.statusText);
	    })
	    .catch((error) => {
	    	if (error.response) {
		    	if(error.response.status === 409) {
		    		alert(error.message);
		    	}
	    	}
	    });  
	}

	render() {
		
		const { title, firstname, lastname, email, password, confirmpassword} = this.state;
	    return (
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
	                <input type="submit" value="Login" className="btn btn-primary"/>
	              </div>
	          </form>
	    );
	}
}

export default LoginForm;