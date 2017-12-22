import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {withRouter} from "react-router-dom";
import Loader from '../common/Loader.js'

class SideOrderSummary extends Component {

	constructor() {
		super();
		this.state = {
		    data : [],
		    basketTotal : 0,
		    emptyBasket : false,
			responseReceived : false,
		};
	}
	
	componentWillMount() {
	}
	
	clickViewBasket(event) {
		let display = document.getElementById("order-details").style.display;
		console.log(display);
		if(display == "none") {
			document.getElementById("order-details").style.display = "block";
			document.getElementById("view-basket-button").innerHTML = "Hide Bag";
		} else if(display == "") {
			document.getElementById("order-details").style.display = "block";
			document.getElementById("view-basket-button").innerHTML = "Hide Bag";
		} else if(display == "block") {
			document.getElementById("order-details").style.display = "none";
			document.getElementById("view-basket-button").innerHTML = "View Bag";
		}
	}

    render() {
		const cookies = new Cookies();
		const basketCount = cookies.get('BASKET_COUNT');

		const items = this.props.data.map((alldata, index) => {
		      return (
                  <div className="summary-content text-left d-flex">
                     <div className="col-md-4">
                     	<img src={ alldata.image }  alt="product" className="thumb" />
                     </div>
                     <div className="col-md-5">
                         <span>{ alldata.name }</span><br/>
                         Quantity : <span>{ alldata.quantity }</span>
                     </div>
                     <div className="col-md-3">
                     	<strong>£{ alldata.itemtotal }</strong>
                     </div>
                  </div>
		      );
		});
		
	    return (
	    		<div className="col col-lg-4 col-md-12 col-sm-12 col-12 side-order-summary">
		    		<div className="card">
		    		   <div className="card-header">
		    		      <h5 className="mb-0">
		    		         <i className="fa fa-shopping-bag order-summary__icon-shopping"></i><span className="order-summary__shopping"> {basketCount} items</span>
		    		         <button className="view-basket" onClick={this.clickViewBasket.bind(this)} id="view-basket-button">View Bag</button>
		    		         <div className="edit-basket"><a href="/basket">Edit Bag</a></div>
		    		      </h5>
		    		   </div>
		    		   <div className="card-block order-details" id="order-details">
	    		         {items}
	    		         <div className="summary-section p-3">
		    		         <div className="summary">
		    		            <div className="summary-left">
		    		               Subtotal:
		    		            </div>
		    		            <div className="summary-right">
		    		               £{this.props.subtotal}
		    		            </div>
		    		         </div>
		    		         <div className="summary">
		    		            <div className="summary-left">
		    		               Shipping:
		    		            </div>
		    		            <div className="summary-right">
		    		               £{this.props.shippingcharges}
		    		            </div>
		    		         </div>
		    		         <div className="summary">
		    		            <div className="summary-left">
		    		               Order Total:
		    		            </div>
		    		            <div className="summary-right">
		    		               £{this.props.ordertotal}
		    		            </div>
		    		         </div>
	    		         </div>
		    		   </div>
		    		</div>
	    		</div>
	    );
    }
}

export default withRouter(SideOrderSummary);