import React, { Component } from 'react';
import Navbar from '../common/Navbar.js'
import SearchPanel from '../common/SearchPanel.js'
import Footer from '../common/Footer.js'
import Myaddress from './Myaddress.js'
import axios from 'axios';
import Cookies from 'universal-cookie';

class MyaccountLanding extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			showAddressComponent: false,
			addressData : []
		};
		this._onAddressClick = this._onAddressClick.bind(this);
	}

	_onAddressClick() {
		const cookies = new Cookies();
		const token = cookies.get('TOKEN');
		const userId = cookies.get('USER_ID');

	    const api = axios.create({
	    	headers: {'Authorization': 'Bearer '+token},
	    	withCredentials: true
	    });
	    
	    api.get('http://localhost:8080/address/'+userId)
	    .then((response) => {
	    	console.log(response.status);
	    	console.log(response.data);
	    	this.setState({
				showAddressComponent: true
			});
	    	this.setState({
	    		addressData : response.data
			});
	    })
	    .catch((error) => {
	    	if (error.response) {
		    	if(error.response.status === 409) {
		    		alert(error.message);
		    	}
	    	}
	    });  
	}

  render() {
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
							<a className="list-group-item with-badge" href="/myaccount">Orders</a>
							<a className="list-group-item" href="/myaccount">Profile</a>
							<a className="list-group-item active btn-primary" href="#address" onClick={this._onAddressClick}>Addresses</a>
							<a className="list-group-item with-badge" href="/myaccount">Wishlist</a>
							<a className="list-group-item with-badge" href="/myaccount">My Tickets</a>
						</nav>
					</div>
					{this.state.showAddressComponent ?
					           <Myaddress data={this.state.addressData} />  :
					           null
					}
				</div>
			</div>
	      </section>
	      <Footer />
	    </div>
    );
  }
}

export default MyaccountLanding;