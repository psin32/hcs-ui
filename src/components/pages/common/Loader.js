import React, { Component } from 'react';
import {withRouter} from "react-router-dom";

class Loader extends Component {

  render() {
	  
    let content = null;
    if (!this.props.data) {
    	content = (
    			<div id="loader"></div>
    	);
    }
    return (
    	<div>
    		{content}
    	</div>
    );
  }
}

export default withRouter(Loader);