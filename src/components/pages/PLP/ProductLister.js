import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import axios from 'axios';

class ProductLister extends Component {

	constructor() {
		super();
	}
	
	render() {
	    const products = this.props.data.map((alldata, index) => {
	    	
	    	  let mainImage = null;
	    	  if(alldata.thumbnail[0] && alldata.thumbnail[0].name == 'front-view') {
	    		  mainImage = alldata.thumbnail[0].url;
	    	  }
		      return (
						<div class="col-lg-3 col-md-4 col-sm-6">
							<div class="item text-center">
								<div class="product-image"><img src={"/"+mainImage} alt="camera"/>
									<div class="overlay"> <a href="#" class="wishlist"><i class="fa fa-heart"></i></a>
										<ul class="list-unstyled">
											<li><a href={"/product/"+alldata.url} class="btn btn-unique">View Detail</a></li>
											<li><a href="#" class="btn btn-dark">Add To Cart</a></li>
										</ul>
									</div>
								</div><a href={"/product/"+alldata.url} class="item-name">
								<h4>{alldata.description.name}</h4></a>
								<ul class="list-inline rate text-primary">
									<li class="list-inline-item"><i class="fa fa-star-o"></i></li>
									<li class="list-inline-item"><i class="fa fa-star-o"></i></li>
									<li class="list-inline-item"><i class="fa fa-star-o"></i></li>
									<li class="list-inline-item"><i class="fa fa-star-o"></i></li>
									<li class="list-inline-item"><i class="fa fa-star-o"></i></li>
								</ul>
								<p>{alldata.description.shortdescription}</p>
								<ul class="price list-inline">
									<li class="list-inline-item"> <span class="price">£{alldata.listprice[0].formattedPrice}</span></li>
								</ul>
							</div>
						</div>
		      );
		});

	    return (
	    	<div className="items">   
	        	<div className="row">
	        		{products}
	            </div>
			</div>	        
	    );
	}
}

export default withRouter(ProductLister);