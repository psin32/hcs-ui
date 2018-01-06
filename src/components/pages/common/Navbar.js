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
		const cookies = new Cookies();
		const basketCount = cookies.get('BASKET_COUNT');
		
		if(!basketCount) {
			cookies.set('BASKET_COUNT', '0')
		}

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
		const basketCount = cookies.get('BASKET_COUNT');
		const registerType = cookies.get('REGISTER_TYPE');
		
		let register = true;
		if(registerType == "G") {
			register = false;
		}
		
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
	    	            
							<li className="nav-item">
							    <ul className="list-inline">
							       <li className="list-inline-item">
							          <a id="search" href="#" className="nav-link">
							             <div className="icon search"><i className="icon-magnifying-glass"></i></div>
							          </a>
							       </li>
							       <li className="list-inline-item">
							          <a href="/basket" className="nav-link">
							             <div className="icon cart"><i className="icon-cart"></i></div>
							             <span className="d-md-none d-lg-inline"><span className="no" id="basketCount" ref="basketCount">{basketCount}</span>items</span>
							          </a>
							       </li>
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