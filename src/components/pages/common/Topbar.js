import React, { Component } from 'react';

class Topbar extends Component {
  render() {
    return (
		<div className="top-bar d-none d-sm-block">
			<div className="container">
				<div className="row">
					<div className="col-sm-4 col-md-3">
						<ul className="list-inline d-flex flex-row">
							<li className="list-inline-item"> 
								<div className="dropdown">
									<button id="currency" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-toggle">USD</button>
									<div aria-labelledby="currency" className="dropdown-menu"><a href="#" className="dropdown-item">EUR</a><a href="#" className="dropdown-item">EGP</a><a href="#" className="dropdown-item">AUD</a></div>
								</div>
							</li>
							<li className="list-inline-item">
								<div className="dropdown">
									<button id="lang" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-toggle">English</button>
									<div aria-labelledby="lang" className="dropdown-menu"><a href="#" className="dropdown-item">French</a><a href="#" className="dropdown-item">Spanish</a><a href="#" className="dropdown-item">Arabic</a></div>
								</div>
							</li>
						</ul>
					</div>
					<div className="col-sm-8 col-md-9 text-right account-details">
						<ul className="list-inline">
							<li className="list-inline-item"> <a href="#">My Account</a></li>
							<li className="list-inline-item"><a href="#">Order History</a></li>
							<li className="list-inline-item"><a href="#">Login</a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
    );
  }
}

export default Topbar;