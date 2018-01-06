import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import Navbar from '../common/Navbar.js'
import SearchPanel from '../common/SearchPanel.js'
import Footer from '../common/Footer.js'
import Topbar from '../common/Topbar.js'

class PageNotFound extends Component {

	constructor() {
		super();
	}
	
	componentWillMount() {
		document.title = "Page Not Found";
	}

	render() {
	    return (
			<div>
			  <Topbar />
		      <Navbar />
		      <SearchPanel />
		      <section>
		        <div className="container">
					<div className="col-md-12 col-md-offset-3 text-center">
						<p>
							<img src="https://cdn3.iconfinder.com/data/icons/tango-icon-library/48/camera-photo-128.png" alt=""/>
						</p>
						<h2><i className="fa fa-exclamation-triangle" style={{color:'red'}}></i>
							Page not found <small>404 error</small>
						</h2>
						<p>Well, this is embarrassing.
						</p>
						<p>
							<a href="/">Click here</a> to visit our home page
						</p>
					</div>	          
		        </div>
		      </section>	  
		      <Footer />
		    </div>
	    );
	}
}

export default withRouter(PageNotFound);