import React, { Component } from 'react';
import Cookies from 'universal-cookie';

class Navbar extends Component {
  render() {
	  
	const cookies = new Cookies();
	const tokenCookie = cookies.get('TOKEN');
	const name = cookies.get('USERNAME');

    return (
    	    <nav className="navbar navbar-expand-md">
    	      <div className="container"><a href="/" className="navbar-brand"> <img src="/img/logo.png" alt="logo"></img></a>
    	        <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" className="navbar-toggler navbar-toggler-right">Menu <i className="fa fa-bars"></i></button>
    	        <div id="navbarSupportedContent" className="collapse navbar-collapse">
    	          <ul className="navbar-nav ml-auto d-md-flex flex-md-row align-items-md-center">
    	            <li className="nav-item active"><a id="navbarDropdown1" data-target="#" href="index.html" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link">Home<i className="fa fa-caret-down"></i></a>
    	              <ul aria-labelledby="navbarDropdown1" className="dropdown-menu">
    	                <li><a href="index.html" className="dropdown-item">Homepage 1</a></li>
    	                <li><a href="index2.html" className="dropdown-item">Homepage 2</a></li>
    	              </ul>
    	            </li>
    	            <li className="nav-item"><a href="category.html" className="nav-link">Category</a></li>
    	            <li className="nav-item"><a id="navbarDropdown2" data-target="#" href="http://example.com" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link">Template content<i className="fa fa-caret-down"></i></a>
    	              <ul aria-labelledby="navbarDropdown2" className="dropdown-menu">
    	                <li><a href="index.html" className="dropdown-item">Homepage 1</a></li>
    	                <li><a href="index2.html" className="dropdown-item">Homepage 2</a></li>
    	                <li><a href="category.html" className="dropdown-item">Category</a></li>
    	                <li><a href="detail.html" className="dropdown-item">Product</a></li>
    	                <li><a href="cart.html" className="dropdown-item">Shopping cart</a></li>
    	                <li className="dropdown-divider"></li>
    	                <li><a href="blog.html" className="dropdown-item">Blog</a></li>
    	                <li><a href="post.html" className="dropdown-item">Blog Post</a></li>
    	                <li><a href="text.html" className="dropdown-item">Text page</a></li>
    	                <li><a href="contact.html" className="dropdown-item">Contact</a></li>
    	                <li className="dropdown dropdown-submenu"><a id="multileveldropdown1" data-target="#" href="http://example.com" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-item">Multilevel dropdown<i className="fa fa-caret-right ml-2"></i></a>
    	                  <ul aria-labelledby="multileveldropdown1" className="dropdown-menu">
    	                    <li><a href="#" className="dropdown-item">Item 1</a></li>
    	                    <li><a href="#" className="dropdown-item">Item 2</a></li>
    	                    <li><a href="#" className="dropdown-item">Item 3         </a></li>
    	                  </ul>
    	                </li>
    	              </ul>
    	            </li>
    	            {tokenCookie ? (
    	    	            <li className="nav-item"><a id="navbarDropdown2" data-target="#" href="/" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link">Welcome {name}<i className="fa fa-caret-down"></i></a>
    	    	              <ul aria-labelledby="navbarDropdown2" className="dropdown-menu">
    	    	              	<li><a href="/myaccount#details" className="dropdown-item">My Details</a></li>
    	    	                <li><a href="/myaccount#address" className="dropdown-item">My Addresses</a></li>
    	    	                <li><a href="/myaccount" className="dropdown-item">Your Orders</a></li>
    	    	                <li><a href="/myaccount" className="dropdown-item">Credit & debit cards</a></li>
    	    	                <li><a href="/clearcookie#logout" className="dropdown-item"><b>Log out</b></a></li>
    	    	              </ul>
    	    	            </li>
    	            ) : (
    	    	            <li className="nav-item">
    	    	              <ul className="list-inline">
    	    	                <li className="list-inline-item"><a href="/login" className="nav-link">Sign In</a></li>
    	    	                <li className="list-inline-item"><a href="/registration" className="nav-link">Register</a></li>
    	    	              </ul>
    	    	            </li>
    	            )}
    	            <li className="nav-item">
    	              <ul className="list-inline">
    	                <li className="list-inline-item"><a id="search" href="#" className="nav-link">
    	                    <div className="icon search"><i className="icon-magnifying-glass"></i></div></a></li>
    	                <li className="list-inline-item"><a href="cart.html" className="nav-link">
    	                    <div className="icon cart"><i className="icon-cart"></i></div><span className="d-md-none d-lg-inline"><span className="no">2</span>items</span></a></li>
    	              </ul>
    	            </li>
    	          </ul>
    	        </div>
    	      </div>
    	    </nav>
    );
  }
}

export default Navbar;