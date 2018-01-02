import React, { Component } from 'react';
import {withRouter} from "react-router-dom";

class Loader extends Component {

  render() {
	
	let overlayId = "blank";
	if (this.props.fullscreen) {
		overlayId = "overlay";
	}
	
    let content = null;
    if (!this.props.data) {
    	content = (
    			<div id={overlayId}>
	    			<div className="container">
		    			<div className="row">
		    				<div id="loader">
		    		    		<div className="dot"></div>
		    					<div className="dot"></div>
		    					<div className="dot"></div>
		    					<div className="dot"></div>
		    					<div className="dot"></div>
		    					<div className="dot"></div>
		    					<div className="dot"></div>
		    					<div className="dot"></div>
		    					<div className="lading"></div>
		    				</div>
		    			</div>
		    		</div>
	    		</div>
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