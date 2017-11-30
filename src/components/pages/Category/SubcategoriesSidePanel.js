import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import axios from 'axios';

class SubcategoriesSidePanel extends Component {

	constructor() {
		super();
		this.state = {
		    data : []
		};
	}
	
	componentWillMount() {
	    const api = axios.create({
	    	withCredentials: true
	    });
	    
	    api.get('http://hcs-catalog:8090/category/subcategories/'+this.props.data)
	    .then((response) => {
            this.setState({
            	data : response.data
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