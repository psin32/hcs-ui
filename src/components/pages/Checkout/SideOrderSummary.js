import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {withRouter} from "react-router-dom";
import Loader from '../common/Loader.js'
import jquery from 'jquery';

class SideOrderSummary extends Component {

	constructor() {
		super();
		this.state = {
			responseReceived : false,
			orderDetailStyle : 'card-block order-details',
			viewEditBagMessage : 'View Bag'
		};
	}
	
	clickViewBasket(event) {
		let orderDetailClass = document.getElementById("order-details").className;
		if(orderDetailClass ==  "card-block order-details") {
	        this.setState({
	        	orderDetailStyle : 'card-block order-summary-visibility',
	        	viewEditBagMessage : 'Hide Bag'
	        });
		} else {
	        this.setState({
	        	orderDetailStyle : 'card-block order-details',
	        	viewEditBagMessage : 'View Bag'
	        });
		}
	}

    render() {
		const cookies = new Cookies();
		const basketCount = cookies.get('BASKET_COUNT');

		const items = this.props.items.map((alldata, index) => {
		      return (
                  <div className="summary-content text-left d-flex">
                     <div className="col-md-4">
                     	<img src={ alldata.image }  alt="product" className="thumb" />
                     </div>
                     <div className="col-md-5">
                         <span>{ alldata.name }</span><br/>
                         <i>Quantity : <span>{ alldata.quantity }</span></i>
                     </div>
                     <div className="col-md-3">
                     	<strong>£{ alldata.itemtotal }</strong>
                     </div>
                  </div>
		      );
		});
		
		let shipping = <div className="summary-right">Not Selected</div>;
		if(this.props.orders.shippingcharges) {
			shipping = <div className="summary-right">£{this.props.orders.shippingcharges}</div>;
		}
		
	    return (
	    		<div className="col col-lg-4 col-md-12 col-sm-12 col-12 side-order-summary">
		    		<div className="card">
		    		   <div className="card-header">
		    		      <h5 className="mb-0">
		    		         <i className="fa fa-shopping-bag order-summary__icon-shopping"></i><span className="order-summary__shopping"> {basketCount} items</span>
		    		         <button className="view-basket" onClick={this.clickViewBasket.bind(this)} id="view-basket-button">{this.state.viewEditBagMessage}</button>
		    		         <div className="edit-basket"><a href="/basket">Edit Bag</a></div>
		    		      </h5>
		    		   </div>
		    		   <div className={this.state.orderDetailStyle} id="order-details">
	    		         {items}
	    		         <div className="summary-section p-3">
		    		         <div className="summary">
		    		            <div className="summary-left">
		    		               Subtotal:
		    		            </div>
		    		            <div className="summary-right">
		    		               £{this.props.orders.subtotal}
		    		            </div>
		    		         </div>
		    		         <div className="summary">
		    		            <div className="summary-left">
		    		               Shipping:
		    		            </div>
		    		            {shipping}
		    		         </div>
		    		         <div className="summary">
		    		            <div className="summary-left">
		    		               Order Total:
		    		            </div>
		    		            <div className="summary-right">
		    		               £{this.props.orders.ordertotal}
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