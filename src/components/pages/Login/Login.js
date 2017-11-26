import React, { Component } from 'react';
import Navbar from '../common/Navbar.js'
import SearchPanel from '../common/SearchPanel.js'
import Footer from '../common/Footer.js'

class Login extends Component {
  render() {
    return (
		<div>
	      <Navbar />
	      <SearchPanel />
	      <section>
	        <div className="container">
	          <header className="mb-5">
	            <h2 className="heading-line">Login</h2>
	          </header>
	          <div className="row">
	            <div className="col-md-6">
	              <form id="contact-form" method="post" action="contact.php" className="custom-form form">
	                <div className="controls">
	                      <div className="form-group">
	                        <label for="username">Username *</label>
	                        <input type="text" name="username" id="username" placeholder="Enter your username" required="required" className="form-control" />
	                      </div>
		                  <div className="form-group">
		                    <label for="password">Password *</label>
		                    <input type="password" name="password" id="password" placeholder="Enter your password" required="required" className="form-control" />
		                  </div>
	                  <input type="submit" value="Login" className="btn btn-primary"/>
	                </div>
	              </form>
	            </div>
	          </div>
	        </div>
	      </section>	  
	      <Footer />
	    </div>
    );
  }
}

export default Login;