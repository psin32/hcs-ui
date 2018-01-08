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
import Hashmap from 'hashmap';

class ProductDetails extends Component {

	constructor() {
		super();
		this.state = {
			originalresponse : [],
			data : [],
		    description : [],
		    fullimagedata : [],
		    listpricedata : [],
		    attributes : [],
		    defaultItem : "",
		    primarycategoryname : "",
		    primarycategoryurl : "",
		    responseok : false,
		    pagenotfound : false,
		    responseReceived : false,
		    quantity : 1,
		    imageLoadFailed : false,
		    selectedPartnumber : '',
		    partnumber : ''
		};
		this.onClickAttribute = this.onClickAttribute.bind(this);
	}
	
	componentWillMount() {
		const url = this.props.match.params.productname;
	    const api = axios.create({
	    	withCredentials: true
	    });
	    
	    let productDetailsURL = process.env.REACT_APP_CATALOG_APP_GET_PRODUCTDETAIL_URL;
	    
	    api.get(productDetailsURL +url)
	    .then((response) => {
	    	response.data.child.map((childdata, index) => {
				if(childdata.partnumber == response.data.defaultItem) {
					this.setProductData(response, childdata);
				}
			});

            this.setState({
            	primarycategoryname : response.data.category.description.name,
            	primarycategoryurl : response.data.category.url
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
	
	setProductData(response, childdata, selectedAttribute) {
        this.setState({
        	originalresponse :  response,
        	originalchilddata : childdata,
			data : response.data,
			selectedPartnumber : childdata.partnumber,
			child : response.data.child,
			description : childdata.description,
			listpricedata : childdata.listprice,
			attributes: response.data.product.attributes,
			responseok : true,
			responseReceived : true
        });
        
        if(childdata.fullimage) {
            this.setState({
    			fullimagedata : childdata.fullimage
            });
        } else {
            this.setState({
    			fullimagedata : response.data.product.fullimage
            });
        }
        
        this.setDefiningAttributes(selectedAttribute);
        
        document.title = this.state.description.name;
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
	
	imageFallback() {
	    this.setState({
	    	imageLoadFailed : true
        });
	}
	
	onClickAttribute(e) {
		let attributeName = e.target.name;
		let attributeValue = e.target.value;
		this.selectDefiningAttributes(attributeName, attributeValue);
	}
	
	selectDefiningAttributes(attributeName, attributeValue) {
		let attribute = null;
        var attributes = [];
		this.state.definingAttributes.map((alldata, index) => {
			var definingAttributesMap = [];
			if(alldata.name == attributeName) {
				alldata.value.map((attrvalue, index) => {
					let map = null;
					if(attrvalue.value == attributeValue) {
						map = {'value' : attrvalue.value, 'selected' : true};
						definingAttributesMap.push(map);
					} else {
						map = {'value' : attrvalue.value, 'selected' : false};
						definingAttributesMap.push(map);
					}
				});
	        	attribute = {'name' : alldata.name, 'value' : definingAttributesMap, 'sequence' : alldata.sequence, 'displayType' : alldata.displayType};
	        	attributes.push(attribute);
			} else {
				attributes.push(alldata);
			}
		});
        if(attributes) {
	        this.setState({
	        	definingAttributes : attributes
	        });
        }
        
        this.state.child.map((childItem, index) => {
    		let totalDefAttr = 0;
    		let matchedCount = 0;
        	if(childItem.attributes) {
	        	childItem.attributes.map((childattr, index) => {
	    			if(childattr.type == 'DEFINING') {
	    				if(childattr.value) {
	    					attributes.map((definingAttr, index) => {
	    						let attrName = definingAttr.name;
	    						definingAttr.value.map((attrvalue, index) => {
	    							if(attrvalue.selected && attrvalue.value == childattr.value && attrName === childattr.name) {
	    								matchedCount = matchedCount + 1;
	    							}
	    						});
	    					});
	    				}
	    				totalDefAttr = totalDefAttr + 1;
	    			}
	    		});
    		}
        	
        	if(matchedCount === totalDefAttr) {
                this.setState({
                	originalchilddata : childItem,
        			selectedPartnumber : childItem.partnumber,
        			description : childItem.description,
        			listpricedata : childItem.listprice,
        			partnumber : childItem.partnumber
                });
        	}
        });
	}
	
	setDefiningAttributes(selectedValue) {
		let attribute = null;
        var attributes = [];

        this.state.attributes.map((productattr, index) => {
        	if(productattr.type == 'DEFINING') {
            	let productAttributeName = productattr.name;
            	let sequence = productattr.sequence;
            	let displayType = productattr.displayType;
            	let map = null;
            	var definingAttributesMap = [];
		        if(this.state.child) {
		        	this.state.child.map((childItem, index) => {
		        		if(childItem.attributes) {
				        	childItem.attributes.map((childattr, index) => {
				    			if(childattr.name == productAttributeName) {
				    				if(childattr.value) {
				    					let existingAttribute = false;
				    					if(definingAttributesMap) {
				    						definingAttributesMap.map((mapItem, index) => {
				    							if(mapItem.value == childattr.value) {
				    								existingAttribute = true;
				    							}
				    						});
				    					}
				    					if(childattr.value == selectedValue) {
				    						map = {'value' : childattr.value, 'selected' : true};
				    						if(!existingAttribute) {
				    							definingAttributesMap.push(map);
				    						}
				    					} else {
				    						map = {'value' : childattr.value, 'selected' : false};
				    						if(!existingAttribute) {
				    							definingAttributesMap.push(map);
				    						}
				    					}
				    				}
				    			}
				    		});
		        		}
		        	});
		        }
		        if(definingAttributesMap) {
		        	attribute = {'name' : productAttributeName, 'value' : definingAttributesMap, 'sequence' : sequence, 'displayType' : displayType};
		        	attributes.push(attribute);
		        }
	        }
        });
        if(attributes) {
	        this.setState({
	        	definingAttributes : attributes
	        });
        }
	}
	
	render() {
		
		let definingAttributeContent = null;
		if(this.state.definingAttributes) {
			
			definingAttributeContent = this.state.definingAttributes.map((alldata, index) => {
				let divContent = null;
				var finalContent = [];
				let content = null;
				let selectedItem = null;
				if(alldata.displayType === 'COLOR') {
					content = alldata.value.map((attrvalue, index) => {
						if(attrvalue.selected) {
							selectedItem = attrvalue.value;
						}
						return (
							<div data-value={attrvalue.value} className="swatch-element color available">
								<div className="tooltip">{attrvalue.value}</div>
								<input id={'swatch-0-'+attrvalue.value} type="radio" name={alldata.name} value={attrvalue.value} checked={attrvalue.selected} onClick={this.onClickAttribute}/>
								<label for={'swatch-0-'+attrvalue.value}><span style={{backgroundColor: '#086fcf'}}></span></label>
							</div>
						);
					});
				} else {
					content = alldata.value.map((attrvalue, index) => {
						if(attrvalue.selected) {
							selectedItem = attrvalue.value;
						}
						return (
							<div data-value={attrvalue.value} className="swatch-element plain available">
								<input id={'swatch-0-'+attrvalue.value} type="radio" name={alldata.name} value={attrvalue.value} checked={attrvalue.selected} onClick={this.onClickAttribute}/>
								<label for={'swatch-0-'+attrvalue.value}>{attrvalue.value}</label>
							</div>
						);
					});
				}
				return (
					<div className="swatch clearfix col col-lg-12 col-md-12 col-sm-12 col-12">
						<div className="header">{alldata.name}: {selectedItem}</div>
						{content}
					</div>
				);
			});
		}
		
		const { quantity} = this.state;
		const fullImages = this.state.fullimagedata.map((alldata, index) => {
			
			let imageUrl = null;
			if(this.state.imageLoadFailed) {
				imageUrl = <img src="/img/backup.jpg" />
			} else {
				imageUrl = <img src={"/"+alldata.url} onError={this.imageFallback.bind(this)} />
			}
			
		    return (
	    		  <div className="item">
	    		  	{imageUrl}
	    		  </div>
		    );
		});
		
		const attributes = this.state.attributes.map((alldata, index) => {
			let data = null;
			if(alldata.type == 'DESCRIPTIVE') {
				data = (
					<ul className="property list-unstyled">
						<li className="title">{alldata.name}</li>
						<li className="value">{alldata.value}</li>
					</ul>
				);
			}
			return (
				<div>					
					{data}
				</div>
			);
		});
		
	    const price = this.state.listpricedata.map((alldata, index) => {
		      return (
	    		  <div className="price d-flex justify-content-between align-items-center text-primary">£{alldata.formattedPrice}
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
			                  <li className="text-uppercase"><span>Item No: </span>{this.state.selectedPartnumber}</li>
			                  <li className="text-uppercase"><span>Category: </span>{ this.state.primarycategory}</li>
			                  <li className="text-uppercase"><span>Availability: </span>In Stock</li>
			                </ul>
			              </div>
			              
			              <div className="description">
			                <p>{this.state.description.shortdescription}</p>
			              </div>
			              
			              <div className="row swatches pt-4">
			              	<form ref="attributeForm">
			              		{definingAttributeContent}
			              	</form>
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
			                  	<AddItemForm partnumber={this.state.partnumber} quantity={this.state.quantity}/>
			                  </li>
			                </ul>
			              </div>
			              <div className="specifications">
			                {attributes}
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