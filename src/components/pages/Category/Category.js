import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import Navbar from '../common/Navbar.js'
import SearchPanel from '../common/SearchPanel.js'
import Footer from '../common/Footer.js'
import Loader from '../common/Loader.js'
import SubcategoriesSidePanel from './SubcategoriesSidePanel.js'
import ProductLister from '../PLP/ProductLister.js'
import axios from 'axios';
import Topbar from '../common/Topbar.js'
import {createClient} from 'contentful'

class Category extends Component {

	constructor() {
		super();
		this.state = {
		    categorydata : [],
		    subcategorydata: [],
		    catentrydata: [],
		    description : [],
		    responseok : false,
		    pagenotfound : false,
		    footerContent : []
		};
	}
	
	componentDidMount() {
		
//		const client = createClient({
//			  // This is the space ID. A space is like a project folder in Contentful terms
//			  space: 'txzdmd97lg8q',
//			  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
//			  accessToken: 'b905804697ea0a6cf15bb22260b29f5c90e7f7c764cb6b4e390ba768dabf3cd4'
//		});
//		client.getEntries({
//			content_type: 'category',
//			'fields.categoryIdentifier[match]': 'health10338'
//		})
//		.then((response) => console.log(response.items[0].fields.content))
//		.catch(console.error)
	}

	componentWillMount() {
		const url = this.props.match.params.category;
	    const api = axios.create({
	    	withCredentials: true
	    });
	    
	    const categoryDetailsURL = process.env.REACT_APP_CATALOG_APP_GET_CATEGORY_DETAILS_URL;
	    
	    api.get(categoryDetailsURL +url)
	    .then((response) => {
            this.setState({
            	categorydata : response.data.category,
            	subcategorydata : response.data.category.childcategories,
            	catentrydata : response.data.catentries,
    			description : response.data.category.description,
    			responseok : true
            });
            document.title = this.state.description.name;
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
	    if(this.state.responseok && this.state.subcategorydata && this.state.subcategorydata.length>0) {
	    	subcategories = <SubcategoriesSidePanel data={this.state.subcategorydata}/>
	    }

	    let products = null;
	    if(this.state.responseok) {
	    	products = <ProductLister data={this.state.catentrydata}/>
	    }

	    let pagenotfound = null;
	    if(this.state.pagenotfound) {
	    	return (
					<div>
					    <Topbar />
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
		if(this.state.categorydata.topnav || this.state.catentrydata.length == 0) {
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
			  <Topbar />
		      <Navbar />
		      <SearchPanel />
		        <Loader data={this.state.responseok}/>
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