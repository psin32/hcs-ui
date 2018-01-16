import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import queryString from 'query-string';
import {withRouter} from "react-router-dom";
import Loader from '../common/Loader.js'
import jquery from 'jquery';
import Navbar from '../common/Navbar.js'
import SearchPanel from '../common/SearchPanel.js'
import Footer from '../common/Footer.js'
import Topbar from '../common/Topbar.js'

class GlobalCollect extends Component {

	constructor() {
		super();
		this.state = {
		    orders : [],
		    items : [],
		    shippingaddress : [],
		    paypalPayment : [],
		    payer : [],
			responseReceived : false,
			username : ''
		};
	}
	
	componentWillMount() {
		window.parent.location.href= document.location.protocol + "//" +document.location.hostname + ":" + document.location.port +"/confirmation";
	}

    render() {
	    return (
			<div>
		    </div>
	    );
    }
}

export default withRouter(GlobalCollect);