import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

class Navbar extends Component {
	
	constructor() {
		super();
		this.state = {
		    data : []
		};
	}
	
	componentDidMount() {
	    const api = axios.create({
	    	withCredentials: true
	    });
	    
	    let topNavURL = process.env.REACT_APP_CATALOG_APP_GET_TOPNAV_URL;
	    
	    api.get(topNavURL)
	    .then((response) => {
            this.setState({
    			data : response.data
            });	    	
	    })
	    .catch((error) => {
	    	if (error.response) {
		    	if(error.response.status === 400) {
	    			this.props.history.push("/clearcookie#accessdenied");
		    	}
	    	}
	    });
	}
	
	render() {

		const cookies = new Cookies();
		const tokenCookie = cookies.get('TOKEN');
		const name = cookies.get('USERNAME');
	    const categories = this.state.data.map((alldata, index) => {
		      return (
		    		<li className="list-inline-item"><a href={"/category/"+alldata.url } className="nav-link">{alldata.description.name}</a></li>
		      );
		});

	    return (
	    	    <nav className="navbar navbar-expand-md">
	    	      <div className="container"><a href="/" className="navbar-brand"> <img src="/img/logo.png" alt="logo"></img></a>
	    	        <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" className="navbar-toggler navbar-toggler-right">Menu <i className="fa fa-bars"></i></button>
	    	        <div id="navbarSupportedContent" className="collapse navbar-collapse">
	    	          <ul className="navbar-nav ml-auto d-md-flex flex-md-row align-items-md-center">
	    	            
	    	            {categories}
	    	            
	    	            {tokenCookie ? (
	    	    	            <li className="nav-item"><a id="navbarDropdown2" data-target="#" href="/" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link">Welcome {name}<i className="fa fa-caret-down"></i></a>
	    	    	              <ul aria-labelledby="navbarDropdown2" className="dropdown-menu">
	    	    	              	<li><a href="/myaccount#details" className="dropdown-item">My Details</a></li>
	    	    	                <li><a href="/myaccount#address" className="dropdown-item">My Addresses</a></li>
	    	    	                <li><a href="/myaccount" className="dropdown-item">Your Orders</a></li>
	    	    	                <li><a href="/myaccount" className="dropdown-item">Credit & debit cards</a></li>
	    	    	                <li><a href="/clearcookie#logout" className="dropdown-item"><b>Log out</b></a></li>
	    	    	              </ul>
	    	    	            </li>
	    	            ) : (
	    	    	            <li className="nav-item">
	    	    	              <ul className="list-inline">
	    	    	                <li className="list-inline-item"><a href="/login" className="nav-link">Sign In</a></li>
	    	    	                <li className="list-inline-item"><a href="/registration" className="nav-link">Register</a></li>
	    	    	              </ul>
	    	    	            </li>
	    	            )}
	    	            
	    	            <li className="nav-item">
	    	              <ul className="list-inline">
	    	                <li className="list-inline-item"><a id="search" href="#" className="nav-link">
	    	                    <div className="icon search"><i className="icon-magnifying-glass"></i></div></a></li>
	    	                <li className="list-inline-item"><a href="cart.html" className="nav-link">
	    	                    <div className="icon cart"><i className="icon-cart"></i></div></a></li>
	    	              </ul>
	    	            </li>
	    	          </ul>
	    	        </div>
	    	      </div>
	    	    </nav>
	    );
	}
}

export default Navbar;