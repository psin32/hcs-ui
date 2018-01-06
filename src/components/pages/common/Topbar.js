import React, { Component } from 'react';
import Cookies from 'universal-cookie';

class Topbar extends Component {
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

	    return (
			<div className="top-bar">
				<div className="container">
					<div className="row">
						<div className="col col-lg-6 col-md-6 col-sm-6 col-6">
							<ul className="list-inline d-flex flex-row">
								<li className="list-inline-item"> 
									<div className="dropdown">
										<button id="currency" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-toggle">GBP</button>
										<div aria-labelledby="currency" className="dropdown-menu">
											<a href="#" className="dropdown-item">USD</a>
											<a href="#" className="dropdown-item">EUR</a>
											<a href="#" className="dropdown-item">AUD</a>
										</div>
									</div>
								</li>
								<li className="list-inline-item">
									<div className="dropdown">
										<button id="lang" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-toggle">English</button>
										<div aria-labelledby="lang" className="dropdown-menu">
											<a href="#" className="dropdown-item">French</a>
											<a href="#" className="dropdown-item">Spanish</a>
											<a href="#" className="dropdown-item">Arabic</a>
										</div>
									</div>
								</li>
							</ul>
						</div>
						<div className="col col-lg-6 col-md-6 col-sm-6 col-6 text-right navbar-collapse">
							<ul className="list-inline d-flex flex-row" style={{float: 'right'}}>
			    	            {tokenCookie && register ? (
										<li className="list-inline-item">
											<div className="dropdown">
												<button id="lang" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-toggle">Welcome {name}</button>
												<div aria-labelledby="lang" className="dropdown-menu">
					    	    	              	<a href="/myaccount#details" className="dropdown-item ">My Details</a>
					    	    	                <a href="/myaccount#address" className="dropdown-item">My Addresses</a>
					    	    	                <a href="/myaccount#orders" className="dropdown-item">Your Orders</a>
					    	    	                <a href="/myaccount" className="dropdown-item">Credit & debit cards</a>
					    	    	                <a href="/clearcookie#logout" className="dropdown-item"><b>Log out</b></a>
												</div>
											</div>
										</li>

			    	            ) : (
			    	    	            <li className="nav-item">
			    	    	              <ul className="list-inline">
			    	    	                <li className="list-inline-item"><a href="/login" className="nav-link">Sign In</a></li>
			    	    	                <li className="list-inline-item"><a href="/registration" className="nav-link">Register</a></li>
			    	    	              </ul>
			    	    	            </li>
			    	            )}
								
							</ul>
						</div>
					</div>
				</div>
			</div>
	    );
	}
}

export default Topbar;