import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import Navbar from '../common/Navbar.js'
import SearchPanel from '../common/SearchPanel.js'
import Footer from '../common/Footer.js'
import Topbar from '../common/Topbar.js'

class Timeout extends Component {

  render() {
    return (
		<div>
		  <Topbar />
	      <Navbar />
	      <SearchPanel />
	      <section>
	        <div className="container">
	          <header className="mb-5">
	            <h2 className="heading-line">Your session is timeout <a href="/login">click here</a> to Login again.</h2>
	          </header>
	        </div>
	      </section>	  
	      <Footer />
	    </div>
    );
  }
}

export default withRouter(Timeout);