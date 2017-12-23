import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {withRouter} from "react-router-dom";
import Loader from '../common/Loader.js'
import jquery from 'jquery';

class DeliveryOption extends Component {

	constructor() {
		super();
		this.state = {
		    data : [],
		    basketTotal : 0,
		    emptyBasket : false,
			responseReceived : false,
			option : ''
		};
	}
	
	componentWillMount() {
        this.setState({
        	option : this.props.option
        });
	}

    onChange = (e) => {
	    const state = this.state
	    state[e.target.name] = e.target.value;
	    this.setState(state);
	}

    render() {
    	
    	const {option} = this.state;
    	
	    return (
	         <div className="card-block">
				<div id="errormessage" style= {{display: 'none'}}>
					<div className="alert alert-danger">
						<strong>ERROR!</strong> Please select option below.
					</div>
				</div>
				
	         	<form onSubmit={(e) => this.props.onSubmit(e, this.state.option)}>
					<div className="radio">
						<input type="radio" name="option" id="collect" value="COLLECT" checked={this.state.option === 'COLLECT'} onClick={this.onChange} />
						<label className="ml-2">Click and Collect</label>
					</div>
					<div className="radio">
						<input type="radio" name="option" id="home" value="HOME" checked={this.state.option === 'HOME'} onClick={this.onChange} />
						<label className="ml-2">Home Delivery</label>
					</div>
					<input type="submit" value="Continue to select address" className="btn btn-unique mt-3 mb-3"/>
				</form>
	         </div>
	    );
    }
}

export default withRouter(DeliveryOption);