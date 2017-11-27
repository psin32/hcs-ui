import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import Navbar from '../common/Navbar.js'
import SearchPanel from '../common/SearchPanel.js'
import Footer from '../common/Footer.js'

class ProductDetails extends Component {

  render() {
	  console.log(this.props);
	const productname = this.props.match.params.productname;
    return (
		<div>
	      <Navbar />
	      <SearchPanel />
	      <section>
	        {productname}
	      </section>	  
	      <Footer />
	    </div>
    );
  }
}

export default withRouter(ProductDetails);