import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import Cookies from 'universal-cookie';
import Navbar from '../common/Navbar.js'
import SearchPanel from '../common/SearchPanel.js'
import Footer from '../common/Footer.js'
import LoginForm from '../../forms/LoginForm.js'
import Topbar from '../common/Topbar.js'

class CheckoutLogin extends Component {
	
	constructor() {
		super();
	}
	
	componentWillMount() {
		const cookies = new Cookies();
		const registerType = cookies.get('REGISTER_TYPE');
		if(registerType == 'R') {
			this.props.history.push("/basket");	    	
		}
		document.title = "Checkout Login";
	}

	render() {
	    return (
			<div>
			  <Topbar />
		      <Navbar />
		      <SearchPanel />
		      <section>
		      	<div className="container">
		      		<div className="row">
				        <div className="col-md-6">
				          <header className="mb-5">
				            <h2 className="heading-line">Sign in</h2>
				          </header>
				          <div className="p-3">Please sign in to your account. If you don't have an account, you can create one.</div>
				          <LoginForm />
				        </div>
				        <div className="col-md-6">
				          <header className="mb-5">
				            <h2 className="heading-line">Guest Checkout</h2>
				          </header>
				          <div className="p-3">No need to register (you can choose to create an account later if you wish)</div>
				          <a href="/checkout" className="p-3 m-3 btn btn-secondary btn-unique">Continue as Guest</a>
				        </div>
			        </div>
		        </div>
		      </section>	  
		      <Footer />
		    </div>
	    );
	}
}

export default withRouter(CheckoutLogin);