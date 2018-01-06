import React, { Component } from 'react';
import Navbar from '../common/Navbar.js'
import SearchPanel from '../common/SearchPanel.js'
import Footer from '../common/Footer.js'
import LoginForm from '../../forms/LoginForm.js'
import Topbar from '../common/Topbar.js'

class Login extends Component {
	
	constructor() {
		super();
	}
	
	componentWillMount() {
		document.title = "Login";
	}

	render() {
	    return (
			<div>
			  <Topbar />
		      <Navbar />
		      <SearchPanel />
		      <section>
		        <div className="container">
		          <header className="mb-5">
		            <h2 className="heading-line">Login</h2>
		          </header>
		          <div className="row col-md-6">
		              <LoginForm />
		          </div>
		        </div>
		      </section>	  
		      <Footer />
		    </div>
	    );
  	}
}

export default Login;