import React, { Component } from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";

class LoginForm extends Component {
	
    constructor() {
        super();
        this.state = {
          email: '',
          password: '',
          incorrectLoginError : false
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
	    
	    api.post('http://hcs-user:8080/login', 
	    	{
	    	    "username": email,
	    	    "password": password
	    	}
	    )
	    .then((response) => {
	    	if (response.status === 200) {
	    		this.props.history.push("/myaccount#details");
	    	}
	    })
	    .catch((error) => {
	    	if (error.response) {
		    	if(error.response.status === 401) {
		    		document.getElementById("errormessage").style.display = "block";
		    	}
	    	}
	    }); 
	}

	render() {
		
		const { title, firstname, lastname, email, password, confirmpassword} = this.state;

	    return (
	    	  <div className="col-md-6">
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
		                <input type="submit" value="Login" className="btn btn-primary"/>
		              </div>
		          </form>
	          </div>
	    );
	}
}

export default withRouter(LoginForm);