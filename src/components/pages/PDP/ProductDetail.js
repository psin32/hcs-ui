import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import Navbar from '../common/Navbar.js'
import SearchPanel from '../common/SearchPanel.js'
import Footer from '../common/Footer.js'
import axios from 'axios';
import Loader from '../common/Loader.js'
import AddItemForm from '../../forms/AddItemForm.js';
import Cookies from 'universal-cookie';
import Topbar from '../common/Topbar.js'

class ProductDetails extends Component {

	constructor() {
		super();
		this.state = {
		    data : [],
		    description : [],
		    fullimagedata : [],
		    categoriesdata : [],
		    listpricedata : [],
		    primarycategoryname : "",
		    primarycategoryurl : "",
		    responseok : false,
		    pagenotfound : false,
		    responseReceived : false,
		    quantity : 1
		};
	}
	
	componentWillMount() {
		const url = this.props.match.params.productname;
	    const api = axios.create({
	    	withCredentials: true
	    });
	    
	    let productDetailsURL = process.env.REACT_APP_CATALOG_APP_GET_PRODUCTDETAIL_URL;
	    
	    api.get(productDetailsURL +url)
	    .then((response) => {
	    	
            this.setState({
    			data : response.data,
    			description : response.data.description,
    			fullimagedata : response.data.fullimage,
    			categoriesdata : response.data.categories,
    			listpricedata : response.data.listprice,
    			responseok : true,
    			responseReceived : true
            });
            document.title = this.state.description.name;
            
            response.data.categories.map((alldata, index) => {
            	if(index == 0) {
    	            this.setState({
    	            	primarycategoryname : alldata.name,
    	            	primarycategoryurl : alldata.url
    	            });
            	}
      	    });               
	    })
	    .catch((error) => {
	    	if (error.response) {
				this.setState({
					responseReceived : true
		        });		

		    	if(error.response.status === 404) {
		            this.setState({
		    			pagenotfound : true
		            });
		    	}
	    	}
	    });
	}
	
	onChange = (e) => {
	    const state = this.state
	    state[e.target.name] = e.target.value;
	    this.setState(state);
	}
	
	onClickQuantity = (e) => {
	    this.setState({
	    	quantity : document.getElementById("quantity").value
        });
	}
	
	render() {
		
		const { quantity} = this.state;
		const fullImages = this.state.fullimagedata.map((alldata, index) => {
		      return (
		    		  <div className="item"> <img src={alldata.url} /></div>
		      );
		});
		
	    const price = this.state.listpricedata.map((alldata, index) => {
		      return (
	    		  <div className="price d-flex justify-content-between align-items-center text-primary">${alldata.formattedPrice}
	                <div className="d-flex justify-content-center">
	                  <ul className="rate list-inline">
	                    <li className="list-inline-item"><i className="fa fa-star-o"></i></li>
	                    <li className="list-inline-item"><i className="fa fa-star-o"></i></li>
	                    <li className="list-inline-item"><i className="fa fa-star-o"></i></li>
	                    <li className="list-inline-item"><i className="fa fa-star-o"></i></li>
	                    <li className="list-inline-item"><i className="fa fa-star-o"></i></li>
	                  </ul><span>No Reviews</span>
	                </div>
	              </div>
		      );
		});
		
		const primarycategory = <a href={"/category/" + this.state.primarycategoryurl} className="text-primary">{ this.state.primarycategoryname}</a>;
		
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
	    };

	    return (
			<div>
			  <Topbar />
		      <Navbar />
		      <Loader data={this.state.responseReceived} fullscreen="true"/>
		      <div className="details-page">
			      <div className="container">
			        <ol className="breadcrumb">
			          <li className="breadcrumb-item text-uppercase"> <a href="/" className="text-primary">Home</a></li>
			          <li className="breadcrumb-item text-uppercase"> {primarycategory}</li>
			          <li className="breadcrumb-item active text-uppercase">{this.state.description.name}</li>
			        </ol>
			      </div>
			      <section className="item-details p-t-small p-b-small">
			        <div className="container">
			          <div className="row">
			            <div className="col-md-6">
					      <Carousel showArrows={true}>
				              {fullImages}
				          </Carousel>
			              <div className="brief">
			                <p>{this.state.description.longdescription}</p>
			              </div>
			            </div>
			            <div className="col-md-6">
			              <h1 className="h2">{this.state.description.name}</h1>
			              {price}
			              <div className="model">
			                <ul className="list-unstyled">
			                  <li className="text-uppercase"><span>Item No: </span>{this.state.data.partnumber}</li>
			                  <li className="text-uppercase"><span>Category: </span>{ this.state.primarycategory}</li>
			                  <li className="text-uppercase"><span>Availability: </span>In Stock</li>
			                </ul>
			              </div>
			              <div className="description">
			                <p>{this.state.description.shortdescription}</p>
			              </div>
			              <div className="row d-flex justify-content-between">
			                <div className="col-lg-6">
			                  <ul className="product-quantity list-inline">
			                    <li className="list-inline-item"> 
			                      <h3 className="h5">Quantity</h3>
			                    </li>
			                    <li className="list-inline-item"> 
			                      <div className="counter d-flex align-items-center justify-content-start">
			                        <div className="minus-btn"><i className="icon-android-remove" onClick={this.onClickQuantity}></i></div>
			                        <input type="text" value={quantity} name="quantity" id="quantity" className="quantity" onChange={this.onChange}/>
			                        <div className="plus-btn"><i className="icon-android-add" onClick={this.onClickQuantity}></i></div>
			                      </div>
			                    </li>
			                  </ul>
			                </div>
			              </div>
			              <div className="CTAs"> 
			                <ul className="list-inline">
			                  <li className="list-inline-item">
			                  	<AddItemForm partnumber={this.state.data.partnumber} quantity={this.state.quantity}/>
			                  </li>
			                </ul>
			              </div>
			              <div className="specifications">
			                <ul className="property list-unstyled">
			                  <li className="title">Focal Length</li>
			                  <li className="value">70-200mm</li>
			                </ul>
			                <ul className="property list-unstyled">
			                  <li className="title">Maximum Apparature</li>
			                  <li className="value">F/2.8</li>
			                </ul>
			                <ul className="property list-unstyled">
			                  <li className="title">Minimum Apparature</li>
			                  <li className="value">F/22</li>
			                </ul>
			                <ul className="property list-unstyled">
			                  <li className="title">Lens Construction</li>
			                  <li className="value">21 element in 16 groups (with 7 ED and some Nano Crystal lens elements)</li>
			                </ul>
			                <ul className="property list-unstyled">
			                  <li className="title">Weight</li>
			                  <li className="value">Approximately 1.540 g/3.4 lb</li>
			                </ul>
			                <ul className="property list-unstyled">
			                  <li className="title">Filter/Attachment size</li>
			                  <li className="value">77mm</li>
			                </ul>
			                <ul className="property list-unstyled">
			                  <li className="title">Maimum Reproduction Ratio</li>
			                  <li className="value">.12x</li>
			                </ul>
			              </div>
			            </div>
			          </div>
			        </div>
			      </section>
			  </div>
		      <Footer />
		    </div>
	    );
	}
}

export default withRouter(ProductDetails);