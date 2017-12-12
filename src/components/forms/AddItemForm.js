import React, { Component } from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";
import Loader from '../pages/common/Loader.js';
import Cookies from 'universal-cookie';

class AddItemForm extends Component {
	
    constructor() {
        super();
        this.state = {
          partnumber: '',
          quantity: '',
          responseReceived : true
        };
    }
    
	onChange = (e) => {
	    const state = this.state
	    state[e.target.name] = e.target.value;
	    this.setState(state);
	}

	onSubmit = (e) => {
		const cookies = new Cookies();
		const token = cookies.get('TOKEN');

		this.setState({
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
	    	}
	    })
	    .catch((error) => {
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
	    return (
	    	  <li>
	    	 	  <Loader data={this.state.responseReceived}/>
		          <form id="addtobag-form"  onSubmit={this.onSubmit} className="custom-form form">
			            <input type="hidden" id="partnumber" name="partnumber" value={this.props.partnumber} />
			            <input type="hidden" id="quantity" name="quantity" value={this.props.quantity} />
			            <input type="submit" value="Add To Bag" className="btn btn-unique"/>
		          </form>
	          </li>
	    );
	}
}

export default withRouter(AddItemForm);