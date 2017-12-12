import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {withRouter} from "react-router-dom";
import Loader from '../common/Loader.js'
import Navbar from '../common/Navbar.js'
import SearchPanel from '../common/SearchPanel.js'
import Footer from '../common/Footer.js'
import EmptyBasket from './EmptyBasket.js';

class Basket extends Component {

	constructor() {
		super();
		this.state = {
		    data : [],
		    basketTotal : 0,
		    emptyBasket : false,
			responseReceived : false
		};
	}
	
	componentWillMount() {
		this.fetchBasket();
	}

	fetchBasket() {
		const cookies = new Cookies();
		const token = cookies.get('TOKEN');

	    const api = axios.create({
	    	headers: {'Authorization': 'Bearer '+token},
	    	withCredentials: true
	    });
	    
	    let basketURL = process.env.REACT_APP_BASKET_APP_GET_CURRENT_BASKET_URL;
	    
	    api.get(basketURL)
	    .then((response) => {
	    	if(response.data.items == null) {
	            this.setState({
	    			emptyBasket : true,
	    			responseReceived : true
	            });	    	
	    	} else {
	            this.setState({
	    			token : token,
	    			responseReceived : true
	            });	    	
	            this.setState({
	            	data : response.data.items,
	            	basketTotal : response.data.basketTotal
	            });
	    	}
	    })
	    .catch((error) => {
	    	if (error.response) {
				this.setState({
					responseReceived : true
		        });		
		    	if(error.response.status === 403) {
		    		if (null == token) {
		    			this.props.history.push("/clearcookie#accessdenied");
		    		} else {
		    			this.props.history.push("/clearcookie#timeout");	
		    		}
		    	}
	    	}
	    });
	}
	
	updateBasket(partnumber, quantity) {
		const cookies = new Cookies();
		const token = cookies.get('TOKEN');

	    const api = axios.create({
	    	headers: {'Authorization': 'Bearer '+token},
	    	withCredentials: true
	    });
	    
	    let updateBasketURL = process.env.REACT_APP_BASKET_APP_UPDATE_BASKET_URL;
	    
	    api.patch(updateBasketURL,
	    	{
	    	    "partnumber": partnumber,
	    	    "quantity": quantity
	    	}
	    )
	    .then((response) => {
	    	if(response.data.items == null) {
	            this.setState({
	    			emptyBasket : true,
	    			responseReceived : true
	            });	    	
	    	} else {
				this.setState({
	            	data : response.data.items,
	            	basketTotal : response.data.basketTotal,
	            	responseReceived : true
		        });		
	    	}
	    })
	    .catch((error) => {
			this.setState({
				responseReceived : true
	        });		
	    	if (error.response) {
		    	if(error.response.status === 403) {
		    		if (null == token) {
		    			this.props.history.push("/clearcookie#accessdenied");
		    		} else {
		    			this.props.history.push("/clearcookie#timeout");	
		    		}
		    	}
	    	}
	    }); 
	}
	
	handleQuantityChange = (idx) => (evt) => {
		this.setState({
			responseReceived : false
        });		
		const updateData = this.state.data.map((alldata, sidx) => {
			if (idx !== sidx) {
				return alldata;
			} else {
				this.updateBasket(alldata.partnumber, evt.target.value);
				return { ...alldata, quantity: evt.target.value };
			}
		});
		this.setState({ data: updateData });
	}
	
	handleQuantityIncrease = (idx) => (evt) => {
		this.setState({
			responseReceived : false
        });		
		const updateData = this.state.data.map((alldata, sidx) => {
			if (idx !== sidx) {
				return alldata;
			} else {
				this.updateBasket(alldata.partnumber, parseInt(document.getElementById(alldata.partnumber).value) +1);
				return { ...alldata, quantity: parseInt(document.getElementById(alldata.partnumber).value) +1 };
			}
		});
		this.setState({ data: updateData });
	}
	
	handleQuantityDecrease = (idx) => (evt) => {
		this.setState({
			responseReceived : false
        });		
		const updateData = this.state.data.map((alldata, sidx) => {
			if (idx !== sidx) {
				return alldata;
			} else {
				this.updateBasket(alldata.partnumber, parseInt(document.getElementById(alldata.partnumber).value) -1);
				return { ...alldata, quantity: parseInt(document.getElementById(alldata.partnumber).value) -1 };
			}
		});
		this.setState({ data: updateData });
	}
	
	handleDeleteItem = (e) => {
		this.setState({
			responseReceived : false
        });		
		const cookies = new Cookies();
		const token = cookies.get('TOKEN');

	    const api = axios.create({
	    	headers: {'Authorization': 'Bearer '+token},
	    	withCredentials: true
	    });
	    
	    let deleteItemURL = process.env.REACT_APP_BASKET_APP_DELETE_ITEM_URL;
	    
	    api.delete(deleteItemURL + e.target.title)
	    .then((response) => {
	    	if(response.data.items == null) {
	            this.setState({
	    			emptyBasket : true,
	    			responseReceived : true
	            });	    	
	    	} else {
				this.setState({
	            	data : response.data.items,
	            	basketTotal : response.data.basketTotal,
	            	responseReceived : true
		        });		
	    	}
	    })
	    .catch((error) => {
			this.setState({
				responseReceived : true
	        });		
	    	if (error.response) {
		    	if(error.response.status === 403) {
		    		if (null == token) {
		    			this.props.history.push("/clearcookie#accessdenied");
		    		} else {
		    			this.props.history.push("/clearcookie#timeout");	
		    		}
		    	}
	    	}
	    }); 
	}
	
    render() {
    	
    	let emptybasket = null;
	    if(this.state.emptyBasket) {
	    	return (
					<EmptyBasket />
	    	);
	    };

	    const items = this.state.data.map((alldata, index) => {
		      return (
			            <div className="row cart-item">
			               <div className="col-5">
			                  <div className="product-overview text-left d-flex">
			                     <a href={ "/product/"+alldata.url } className="product-img">
			                     	<img src={ alldata.image }  alt="product" className="thumb" />
			                     </a>
			                     <div className="product-details">
			                        <a href={ "/product/"+alldata.url }>
			                           <h3 className="h4">{ alldata.name }</h3>
			                        </a>
			                     </div>
			                  </div>
			               </div>
			               <div className="col-2"><strong>£{ alldata.listprice }</strong></div>
			               <div className="col-2">
			                  <div className="product-quantity d-flex align-items-center justify-content-center">
			                     <div className="minus-btn"><i className="icon-android-remove" title={alldata.partnumber} onClick={this.handleQuantityDecrease(index)}></i></div>
			                     <input type="text" value={ alldata.quantity } id={alldata.partnumber} name={alldata.partnumber} className="quantity" onChange={this.handleQuantityChange(index)}/>
			                     <div className="plus-btn"><i className="icon-android-add" title={alldata.partnumber} onClick={this.handleQuantityIncrease(index)}></i></div>
			                  </div>
			               </div>
			               <div className="col-2"><strong>£{ alldata.itemtotal }</strong></div>
			               <div className="col-1"><a href="#"><i className="fa fa-close" title={alldata.partnumber} onClick={this.handleDeleteItem}></i></a></div>
			            </div>		    		  
		      );
		});

	    return (
				<div>
					<Navbar />
					<SearchPanel />
					<div className="cart-page">
						<Loader data={this.state.responseReceived}/>
						<div className="container">
							<ol className="breadcrumb">
							<li className="breadcrumb-item text-uppercase"> <a href="/" className="text-primary">Home</a></li>
							<li className="breadcrumb-item active text-uppercase">Shopping Cart</li>
							</ol>
						</div>
						<section className="cart">
						   <div className="container">
						      <div className="cart-holder">
						         <div className="cart-heading text-center">
						            <div className="row">
						               <div className="col-5 text-left">Product</div>
						               <div className="col-2">Price</div>
						               <div className="col-2">Quantity</div>
						               <div className="col-2">Total</div>
						               <div className="col-1"></div>
						            </div>
						         </div>
						         <div className="cart-body text-center">
						            {items}
						         </div>
						      </div>
						      <div className="total-price text-right">
						         <div className="container">
						            <div className="d-flex justify-content-end align-items-center"><span className="h3">Total: &nbsp;</span><strong className="h2 text-primary">£{this.state.basketTotal}</strong></div>
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

export default withRouter(Basket);