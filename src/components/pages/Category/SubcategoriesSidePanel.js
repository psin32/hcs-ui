import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import Loader from '../common/Loader.js'
import axios from 'axios';

class SubcategoriesSidePanel extends Component {

	constructor() {
		super();
		this.state = {
		    data : [],
		    responseok : false
		};
	}
	
	componentWillMount() {
	    const api = axios.create({
	    	withCredentials: true
	    });
	    
	    let subcategoryDetailsURL = process.env.REACT_APP_CATALOG_APP_GET_SUBCATEGORY_DETAILS_URL;
	    
	    api.get(subcategoryDetailsURL +this.props.data)
	    .then((response) => {
            this.setState({
            	data : response.data,
            	responseok : true
            });
	    })
	    .catch((error) => {
	    	if (error.response) {
		    	if(error.response.status === 400) {
	    			this.props.history.push("/clearcookie#accessdenied");
		    	}
	    	}
	    });
	}

	render() {
		
	    const subcategories = this.state.data.map((alldata, index) => {
		      return (
		    		  <li key={ index }><a href={ alldata.url }>{ alldata.description.name }</a></li>
		      );
		});

	    return (
	        <div className="simple-list">
	        	<Loader data={this.state.responseok}/>
	        	<div className="left-navigation">
	        		<nav role="navigation">
	        			<ul>
	        				{subcategories}
	            		</ul>
	            	</nav>
	            </div>
			</div>	        
	    );
	}
}

export default withRouter(SubcategoriesSidePanel);