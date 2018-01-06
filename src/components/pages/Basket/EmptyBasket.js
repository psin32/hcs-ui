import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {withRouter} from "react-router-dom";
import Loader from '../common/Loader.js'
import Navbar from '../common/Navbar.js'
import SearchPanel from '../common/SearchPanel.js'
import Footer from '../common/Footer.js'
import Topbar from '../common/Topbar.js'

class EmptyBasket extends Component {

	constructor() {
		super();
		this.state = {
		    data : [],
		    basketTotal : 0,
		    emptyBasket : false,
			responseReceived : false
		};
	}

    render() {
    	
	    return (
				<div>
				    <Topbar />
					<Navbar />
					<SearchPanel />
					<div className="cart-page">
						<div className="container">
							<ol className="breadcrumb">
							<li className="breadcrumb-item text-uppercase"> <a href="/" className="text-primary">Home</a></li>
							<li className="breadcrumb-item active text-uppercase">Shopping Cart</li>
							</ol>
						</div>

						<section className="cart">
							<div className="ml-auto mr-auto col-lg-8 text-center">
								<div className="social">
									<h2>Your basket is empty.</h2>
								</div>
							</div>
						</section>
					</div>
					<Footer />
				</div>
	    );
    }
}

export default withRouter(EmptyBasket);