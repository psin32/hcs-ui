import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import Navbar from '../common/Navbar.js'
import SearchPanel from '../common/SearchPanel.js'
import Footer from '../common/Footer.js'
import SubcategoriesSidePanel from './SubcategoriesSidePanel.js'
import ProductLister from '../PLP/ProductLister.js'
import axios from 'axios';

class Category extends Component {

	constructor() {
		super();
		this.state = {
		    data : [],
		    description : [],
		    responseok : false,
		    pagenotfound : false
		};
	}
	
	componentWillMount() {
		const url = this.props.match.params.category;
	    const api = axios.create({
	    	withCredentials: true
	    });
	    
	    api.get('http://localhost:8090/category/url/'+url)
	    .then((response) => {
            this.setState({
    			data : response.data,
    			description : response.data.description,
    			responseok : true
            });
	    })
	    .catch((error) => {
	    	if (error.response) {
		    	if(error.response.status === 404) {
		            this.setState({
		    			pagenotfound : true
		            });
		    	}
	    	}
	    });
	}

	render() {
		let subcategories = null;
	    if(this.state.responseok) {
	    	subcategories = <SubcategoriesSidePanel data={this.state.data.identifier}/>
	    }

	    let products = null;
	    if(this.state.responseok) {
	    	products = <ProductLister data={this.state.data.identifier}/>
	    }

	    let pagenotfound = null;
	    if(this.state.pagenotfound) {
	    	return (
					<div>
						<Navbar />
						<SearchPanel />
						<section>
			    			<div className="col-md-12 col-md-offset-3 text-center">
								<p>
									<img src="https://cdn3.iconfinder.com/data/icons/tango-icon-library/48/camera-photo-128.png" alt=""/>
								</p>
								<h2><i className="fa fa-exclamation-triangle" style={{color:'red'}}></i>
									Page not found <small>404 error</small>
								</h2>
								<p>Well, this is embarrassing.
								</p>
								<p>
									<a href="/">Click here</a> to visit our home page
								</p>
							</div>
						</section>
						<Footer />
					</div>
	    	);
	    }

		let topnavCategoryContent = null;
		if(this.state.data.topnav) {
			topnavCategoryContent = (
		          	<div className="items">
		          		<div className="row">
				          	<div className="col-md-2 hidden-md">
				          		{subcategories}
				          	</div>
			    	        <div className="col-md-10">
			    	          <div className="row d-flex flex-row align-items-stretch">
			    	            <div className="col-lg-6">
			    	              <div className="item item-big text-right">
			    	                <h2>
			    	                  Digital <br />Cameras  
			    	                </h2><a href="category.html" className="btn btn-unique btn-lg">Shop Now</a><img src="/img/camera-big.jpg" alt="camera" className="img-fluid" />
			    	              </div>
			    	            </div>
			    	            <div className="col-lg-6">
			    	              <div className="row">
			    	                <div className="col-md-6">
			    	                  <div className="item">
			    	                    <h4>EOS Digital SLR</h4>
			    	                    <p className="text-primary">650D</p><img src="/img/camera-1.jpg" alt="camera" className="img-fluid"/>
			    	                    <div className="overlay d-flex align-items-center justify-content-center"><a href="detail.html" className="btn btn-unique">View Details</a></div>
			    	                  </div>
			    	                </div>
			    	                <div className="col-md-6">
			    	                  <div className="item">
			    	                    <h4>EOS Digital SLR</h4>
			    	                    <p className="text-primary">600D</p><img src="/img/cat-cam.jpg" alt="camera" className="img-fluid" />
			    	                    <div className="overlay d-flex align-items-center justify-content-center"><a href="detail.html" className="btn btn-unique">View Details</a></div>
			    	                  </div>
			    	                </div>
			    	                <div className="col-md-6">
			    	                  <div className="item">
			    	                    <h4>EOS Digital SLR</h4>
			    	                    <p className="text-primary">1100D</p><img src="/img/camera-3.jpg" alt="camera" className="img-fluid" />
			    	                    <div className="overlay outStock d-flex align-items-center justify-content-center"><strong className="text-primary">Sold Out</strong></div>
			    	                  </div>
			    	                </div>
			    	                <div className="col-md-6">
			    	                  <div className="item">
			    	                    <h4>EOS Digital SLR</h4>
			    	                    <p className="text-primary">3000D</p><img src="/img/camera-2.jpg" alt="camera" className="img-fluid" />
			    	                    <div className="overlay d-flex align-items-center justify-content-center"><a href="detail.html" className="btn btn-unique">View Details</a></div>
			    	                  </div>
			    	                </div>
			    	              </div>
			    	            </div>
			    	          </div>
			    	        </div>
			          	</div>
		          </div>
			);
		}

	    return (
			<div>
		      <Navbar />
		      <SearchPanel />
				<div className="container">
					<ol className="breadcrumb">
						<li className="breadcrumb-item text-uppercase"> <a href="/" className="text-primary">Home</a></li>
						<li className="breadcrumb-item active text-uppercase">{this.state.description.name}</li>
					</ol>
				</div>
		        <section className="products">
			        <div className="container">
			          <header className="mb-5">
			            <h1 className="heading-line">{this.state.description.name}</h1>
			          </header>
			          {topnavCategoryContent}
			          {products}
					</div>	
				</section>		      
		      <Footer />
		    </div>
	    );
	}
}

export default withRouter(Category);