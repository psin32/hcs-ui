import React, { Component } from 'react';
import Navbar from '../common/Navbar.js'
import SearchPanel from '../common/SearchPanel.js'
import Footer from '../common/Footer.js'
import RegistrationForm from '../../forms/RegistrationForm.js'

class Registration extends Component {
  render() {
    return (
		<div>
	      <Navbar />
	      <SearchPanel />
	      <section>
	        <div className="container">
	          <header className="mb-5">
	            <h2 className="heading-line">Registration</h2>
	          </header>
	          <div className="row">
	            <div className="col-md-6">
	              <RegistrationForm />
	            </div>
	          </div>
	        </div>
	      </section>
	      <Footer />
	    </div>
    );
  }
}

export default Registration;