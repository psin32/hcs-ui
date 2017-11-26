import React, { Component } from 'react';
import axios from 'axios';

class RegistrationForm extends Component {
	
    constructor() {
        super();
        this.state = {
          title: '',
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          confirmpassword: '',
        };
    }
    
	onChange = (e) => {
	    // Because we named the inputs to match their corresponding values in state, it's
	    // super easy to update the state
	    const state = this.state
	    state[e.target.name] = e.target.value;
	    this.setState(state);
	}

	onSubmit = (e) => {
	    e.preventDefault();
	    const { title, firstname, lastname, email, password, confirmpassword } = this.state;

	    axios.post('http://localhost:8080/register', 
	    	{
	    	  "users":{
	    	    "username": email,
	    	    "registertype": "R",
	    	    "password": password,
	    	    "profiletype": "C"
	    	  },
	    	  "address":{
	    	    "addresstype": "S",
	    	    "status": "P",
	    	    "email1": email,
	    	    "nickname": firstname,
	    	    "title": title,
	    	    "firstname": firstname,
	    	    "lastname": lastname,
	    	    "isprimary" : 0,
	    	    "selfaddress" : 0
	    	  }
	    	}
	    )
	    .then((response) => {
	    	console.log(response.status);
	    	console.log(response.statusText);
	    })
	    .catch((error) => {
	    	if (error.response) {
		    	console.log(error.response.status);
		    	console.log(error.message);
		    	console.log(JSON.stringify(error.response.headers, null, '\t'));
		    	console.log(JSON.stringify(error.response.data, null, '\t'));
		    	if(error.response.status == 409) {
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
	                    <label for="title">Title *</label>
	                    <input type="text" name="title" id="title" placeholder="Enter title" required="required" className="form-control" value={title} onChange={this.onChange} />
	                  </div>
	                  <div className="form-group">
	                    <label for="firstname">Firstname *</label>
	                    <input type="text" name="firstname" id="firstname" placeholder="Enter your firstname" required="required" className="form-control" value={firstname} onChange={this.onChange} />
	                  </div>
	                  <div className="form-group">
	                    <label for="lastname">Lastname *</label>
	                    <input type="text" name="lastname" id="lastname" placeholder="Enter your lastname" required="required" className="form-control" value={lastname} onChange={this.onChange} />
	                  </div>
	                  <div className="form-group">
	                    <label for="email">Email Address *</label>
	                    <input type="email" name="email" id="email" placeholder="Enter your email" required="required" className="form-control" value={email} onChange={this.onChange} />
	                  </div>
	                  <div className="form-group">
	                    <label for="password">Password *</label>
	                    <input type="password" name="password" id="password" placeholder="Enter your password" required="required" className="form-control" value={password} onChange={this.onChange} />
	                  </div>
	                  <div className="form-group">
	                    <label for="confirmpassword">Confirm password *</label>
	                    <input type="password" name="confirmpassword" id="√" placeholder="Confirm your password" required="required" className="form-control" value={confirmpassword} onChange={this.onChange} />
	                  </div>
	              <input type="submit" value="Register" className="btn btn-primary"/>
	            </div>
	          </form>
	    );
	}
}

export default RegistrationForm;