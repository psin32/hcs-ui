import React, { Component } from 'react';

class Footer extends Component {
	

//	componentWillMount() {
//		fetch('http://localhost:8080/api/collections/get/Category?token=account-429ccfe060eae1a39079cb493c68eb')
//	    .then(res => res.json())
//	    .then(
//	    		res => {
//		            this.setState({
//		            	footerContent : res.entries[0].content
//		            });
//	    		}
//	    );
//	}
//
//	render() {
//	    return (
//		    <footer className="main-footer"  dangerouslySetInnerHTML={ {__html: this.state.footerContent} } >
//	    	 </footer>
//	    );
//	}

	render() {
	    return (
		    <footer className="main-footer">
		      <div className="page-links">
		        <div className="container">
		          <div className="row">
		            <div className="col-lg-3 col-sm-6">
		              <h3>Site Map</h3>
		              <ul className="list-unstyled">
		                <li> <a href="#">Home</a></li>
		                <li> <a href="#">About Us</a></li>
		                <li> <a href="#">Categories</a></li>
		                <li> <a href="#">Privacy policy</a></li>
		                <li> <a href="#">Contact Us</a></li>
		              </ul>
		            </div>
		            <div className="col-lg-3 col-sm-6">
		              <h3>Our Services</h3>
		              <ul className="list-unstyled">
		                <li> <a href="#">Footer Link</a></li>
		                <li> <a href="#">Footer Link</a></li>
		                <li> <a href="#">Footer Link</a></li>
		                <li> <a href="#">Footer Link</a></li>
		                <li> <a href="#">Footer Link</a></li>
		              </ul>
		            </div>
		            <div className="col-lg-2 col-sm-6">
		              <h3>Extras</h3>
		              <ul className="list-unstyled">
		                <li> <a href="#">Footer Link</a></li>
		                <li> <a href="#">Footer Link</a></li>
		                <li> <a href="#">Footer Link</a></li>
		                <li> <a href="#">Footer Link</a></li>
		                <li> <a href="#">Footer Link</a></li>
		              </ul>
		            </div>
		            <div className="col-lg-4 col-sm-6 details js-pull">
		              <ul className="list-unstyled">
		                <li className="d-flex align-items-center">
		                  <div className="icon"><i className="icon-delivery-truck"></i></div>
		                  <div className="text"> 
		                    <h3>Free Shipping Worldwide</h3>
		                    <p>On orders over $200</p>
		                  </div>
		                </li>
		                <li className="d-flex align-items-center">
		                  <div className="icon"><i className="icon-dollar-symbol"></i></div>
		                  <div className="text"> 
		                    <h3>30 days money back</h3>
		                    <p>Money back guarantee</p>
		                  </div>
		                </li>
		                <li className="d-flex align-items-center">
		                  <div className="icon"><i className="icon-phone-call"></i></div>
		                  <div className="text"> 
		                    <h3>Phone: 123-456-789</h3>
		                    <p>Contact with us</p>
		                  </div>
		                </li>
		              </ul>
		            </div>
		          </div>
		        </div>
		      </div>
	    	 </footer>
	    );
	}
}

export default Footer;