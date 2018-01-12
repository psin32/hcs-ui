import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

class CheckoutNavbar extends Component {
	
	constructor() {
		super();
		this.state = {
		    data : []
		};
	}
	
	componentDidMount() {
	}
	
	render() {
		
	    return (
	    	    <nav className="navbar navbar-expand-md">
	    	      <div className="container"><a href="/" className="navbar-brand"> <img src="/img/logo-new.png" alt="logo"></img></a>
	    	          <ul className="navbar-nav ml-auto d-md-flex flex-md-row align-items-md-center">
							<i className="fa fa-phone"> 020 1234 456</i>
	    	          </ul>
	    	      </div>
	    	    </nav>
	    );
	}
}

export default CheckoutNavbar;