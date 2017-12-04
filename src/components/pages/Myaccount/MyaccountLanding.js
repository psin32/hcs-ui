import React, { Component } from 'react';
import Navbar from '../common/Navbar.js'
import SearchPanel from '../common/SearchPanel.js'
import Footer from '../common/Footer.js'
import Myaddress from './Myaddress.js'
import Mydetails from './Mydetails.js'
import {withRouter} from "react-router-dom";

class MyaccountLanding extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showAddressComponent: false,
			showDetailsComponent: true,
			detailSectionClass : 'list-group-item',
			addressSectionClass : 'list-group-item',
			orderSectionClass : 'list-group-item',
			cardSectionClass : 'list-group-item'
		};
		this._onAddressClick = this._onAddressClick.bind(this);
		this._onDetailsClick = this._onDetailsClick.bind(this);
	}

	_onAddressClick() {
    	this.setState({
			showAddressComponent: true
		});
	}
	
	_onDetailsClick() {
    	this.setState({
    		showDetailsComponent: true
		});
	}

  render() {
	if(this.props.location.hash == '#details') {
		this.state = {
			showAddressComponent: false,
			showDetailsComponent: true,
			detailSectionClass : 'list-group-item active btn-primary',
			addressSectionClass : 'list-group-item',
			orderSectionClass : 'list-group-item',
			cardSectionClass : 'list-group-item'
		};
	}
	if(this.props.location.hash == '#address') {
		this.state = {
			showAddressComponent: true,
			showDetailsComponent: false,
			addressSectionClass : 'list-group-item active btn-primary',
			detailSectionClass : 'list-group-item',
			orderSectionClass : 'list-group-item',
			cardSectionClass : 'list-group-item'
		};
	}
	
	let myaddressComponent = null;
	if(this.state.showAddressComponent) {
		myaddressComponent = <Myaddress />
	}

	let mydetailsComponent = null;
	if(this.state.showDetailsComponent) {
		mydetailsComponent = <Mydetails />
	}
		
    return (
		<div>
	      <Navbar />
	      <SearchPanel />
	      <section>
	        <div className="container">
	          <header className="mb-5">
	            <h2 className="heading-line">My Account</h2>
	          </header>
				<div className="row">
					<div className="col-lg-4">
						<nav className="list-group">
							<a className={this.state.detailSectionClass} href="#details" onClick={this._onDetailsClick}>My Details</a>
							<a className={this.state.addressSectionClass} href="#address" onClick={this._onAddressClick}>My Addresses</a>
							<a className={this.state.orderSectionClass} href="/myaccount">Orders</a>
							<a className={this.state.cardSectionClass} href="/myaccount">Credit & Debit Cards</a>
							<a className="list-group-item with-badge" href="/myaccount">My Tickets</a>
						</nav>
					</div>
					{myaddressComponent}
					{mydetailsComponent}
				</div>
			</div>
	      </section>
	      <Footer />
	    </div>
    );
  }
}

export default withRouter(MyaccountLanding);