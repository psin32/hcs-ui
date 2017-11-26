import React, { Component } from 'react';
class SearchPanel extends Component {
  render() {
    return (
	    <div className="search-overlay">
	      <div className="search-inner d-flex justify-content-center align-items-center">
	        <div className="search-close"><i className="icon-close"></i></div>
	        <div className="container">
	          <div className="form-holder">
	            <form className="d-flex">
	              <input type="search" placeholder="What are you looking for..." />
	              <button type="submit" className="search text-primary text-uppercase">Search</button>
	            </form>
	          </div>
	        </div>
	      </div>
	    </div>    		
    );
  }
}

export default SearchPanel;