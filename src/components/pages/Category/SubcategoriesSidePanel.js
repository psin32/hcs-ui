import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import Loader from '../common/Loader.js'
import axios from 'axios';

class SubcategoriesSidePanel extends Component {

	constructor() {
		super();
	}
	
	render() {
	    const subcategories = this.props.data.map((alldata, index) => {
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