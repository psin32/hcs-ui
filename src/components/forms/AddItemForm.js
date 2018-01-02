import React, { Component } from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";
import Loader from '../pages/common/Loader.js';
import Cookies from 'universal-cookie';
import jquery from 'jquery';

class AddItemForm extends Component {
	
    constructor() {
        super();
        this.state = {
          partnumber: '',
          quantity: '',
          responseReceived : true
        };
    }
    
    componentWillMount() {
		this.setState({
			quantity : this.props.quantity,
        	partnumber : this.props.partnumber
        });		
    }

	onChange = (e) => {
	    const state = this.state
	    state[e.target.name] = e.target.value;
	    this.setState(state);
	}

	onSubmit = (e) => {
		const cookies = new Cookies();
		const token = cookies.get('TOKEN');
		let loadingText = jquery("#load").attr("data-loading-text");
		let buttonDefaultValue = jquery("#load").html();
		jquery("#load").html(loadingText);
		this.setState({
			responseReceived : false,
        	responseok : false
        });		
	    e.preventDefault();
	    const { partnumber, quantity} = this.state;

	    const api = axios.create({
	    	headers: {'Authorization': 'Bearer '+token},
	    	withCredentials: true
	    });
	    
	    let addItemURL = process.env.REACT_APP_BASKET_APP_ADD_ITEM_URL;
	    
	    api.put(addItemURL,
	    	{
	    	    "partnumber": this.props.partnumber,
	    	    "quantity": this.props.quantity
	    	}
	    )
	    .then((response) => {
			this.setState({
				responseReceived : true
	        });		
	    	if (response.status === 200) {
	    		document.getElementById("successmessage").style.display = "block";
	    		jquery('#successmessage').delay(3000).hide(1000);
	    		const basketCount = cookies.get('BASKET_COUNT');
	    		document.getElementById("basketCount").innerText = basketCount;
	    	}
	    	jquery("#load").html(buttonDefaultValue);
	    })
	    .catch((error) => {
	    	jquery("#load").html(buttonDefaultValue);
			this.setState({
				responseReceived : true
	        });		
	    	if (error.response) {
		    	if(error.response.status === 401) {
		    		document.getElementById("errormessage").style.display = "block";
		    	}
	    	}
	    }); 
	}

	render() {
		
		const {quantity, partnumber} = this.state;
	    return (
	    	  <li>
		          <form id="addtobag-form"  onSubmit={this.onSubmit} className="custom-form form">
			            <input type="hidden" id="partnumber" name="partnumber" value={partnumber} />
			            <input type="hidden" id="quantity" name="quantity" value={quantity} />
			            <button type="submit" className="btn btn-unique" id="load" data-loading-text="<i class='fa fa-circle-o-notch fa-spin'></i> Adding item...">Add To Bag</button>
		          </form>
			      <p className="cart-feedback success" style= {{display: 'none'}} id="successmessage">
			      	<i className="fa fa-check"></i> 
			      	Thanks! Your item is added to the cart! 
			      	<span>
			      		<a href="/basket" className="cart">View Basket</a>
			      		<a href="/checkout" className="checkout">checkout</a>
			      	</span>
			      </p>
			      <p className="cart-feedback error" style= {{display: 'none'}} id="errormessage">
			      	Unable to add this item, please check later.
			      </p>			      
	          </li>
	    );
	}
}

export default withRouter(AddItemForm);