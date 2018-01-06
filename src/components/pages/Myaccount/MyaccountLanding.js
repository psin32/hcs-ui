import React, { Component } from 'react';
import Navbar from '../common/Navbar.js'
import SearchPanel from '../common/SearchPanel.js'
import Footer from '../common/Footer.js'
import Myaddress from './Myaddress.js'
import Mydetails from './Mydetails.js'
import OrderHistory from './OrderHistory.js'
import {withRouter} from "react-router-dom";
import Topbar from '../common/Topbar.js'

class MyaccountLanding extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showAddressComponent: false,
			showDetailsComponent: true,
			showOrdersComponent: false,
			detailSectionClass : 'list-group-item',
			addressSectionClass : 'list-group-item',
			orderSectionClass : 'list-group-item',
			cardSectionClass : 'list-group-item'
		};
		this._onAddressClick = this._onAddressClick.bind(this);
		this._onDetailsClick = this._onDetailsClick.bind(this);
		this._onOrdersClick = this._onOrdersClick.bind(this);
		document.title = "My Account";
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
	
	_onOrdersClick() {
    	this.setState({
    		showOrdersComponent: true
		});
	}

	render() {
		if(this.props.location.hash == '#details') {
			this.state = {
				showAddressComponent: false,
				showDetailsComponent: true,
				showOrdersComponent: false,
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
				showOrdersComponent: false,
				addressSectionClass : 'list-group-item active btn-primary',
				detailSectionClass : 'list-group-item',
				orderSectionClass : 'list-group-item',
				cardSectionClass : 'list-group-item'
			};
		}
		if(this.props.location.hash == '#orders') {
			this.state = {
				showAddressComponent: false,
				showDetailsComponent: false,
				showOrdersComponent:true,
				addressSectionClass : 'list-group-item',
				detailSectionClass : 'list-group-item',
				orderSectionClass : 'list-group-item active btn-primary',
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
		
		let ordersComponent = null;
		if(this.state.showOrdersComponent) {
			ordersComponent = <OrderHistory />
		}
			
	    return (
			<div>
			  <Topbar />
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
								<a className={this.state.orderSectionClass} href="#orders" onClick={this._onOrdersClick}>Orders</a>
								<a className={this.state.cardSectionClass} href="/myaccount">Credit & Debit Cards</a>
								<a className="list-group-item with-badge" href="/myaccount">My Tickets</a>
							</nav>
						</div>
						{myaddressComponent}
						{mydetailsComponent}
						{ordersComponent}
					</div>
				</div>
		      </section>
		      <Footer />
		    </div>
	    );
	}
}

export default withRouter(MyaccountLanding);