import React, { Component } from 'react';
import Navbar from '../common/Navbar.js'
import SearchPanel from '../common/SearchPanel.js'
import Footer from '../common/Footer.js'

class Homepage extends Component {
  render() {
    return (
    	    <div className="home-page">
    	      <Navbar />
    	      <SearchPanel />
    	      <section className="hero hero-2">
    	        <div data-slider-id="1" className="owl-carousel hero-2-slider">
    	          <div style= {{background: 'url(img/hero-bg-1.jpg) no-repeat'}} className="item d-flex align-items-center align-items-center"> 
    	            <div className="container">
    	              <div className="content text-center">
    	                <h5 className="text-uppercase">Lorem ipsum dolor</h5>
    	                <h1 className="text-uppercase text-primary">Camera House</h1>
    	                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud</p><a href="category.html" className="arrow text-uppercase">shop now</a>
    	              </div>
    	            </div>
    	          </div>
    	          <div style= {{background: 'url(img/hero-bg-2.jpg) no-repeat'}} className="item d-flex align-items-center align-items-center"> 
    	            <div className="container d-flex align-items-center">
    	              <div className="content text-center">
    	                <h5 className="text-uppercase">Lorem ipsum dolor</h5>
    	                <h1 className="text-uppercase text-primary">Camera House</h1>
    	                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud</p><a href="category.html" className="arrow text-uppercase">shop now</a>
    	              </div>
    	            </div>
    	          </div>
    	          <div style= {{background: 'url(img/hero-bg-3.jpg) no-repeat'}} className="item d-flex align-items-center align-items-center"> 
    	            <div className="container d-flex align-items-center">
    	              <div className="content text-center">
    	                <h5 className="text-uppercase">Lorem ipsum dolor</h5>
    	                <h1 className="text-uppercase text-primary">Camera House</h1>
    	                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud</p><a href="category.html" className="arrow text-uppercase">shop now</a>
    	              </div>
    	            </div>
    	          </div>
    	        </div>
    	      </section>
    	      <section className="categories">
    	        <div className="container">
    	          <div className="categories-inner">
    	            <header>
    	              <h2 className="h5 heading-line d-none d-md-block">Categories</h2>
    	            </header>
    	            <div className="row text-center">
    	              <div className="col-md-4 item"><a href="category.html">
    	                  <h4>Digital Cameras</h4>
    	                  <p>Lorem ipsum dolor sit amet</p>
    	                  <div className="image"><img src="img/cat-cam.jpg" alt="camera" className="img-fluid"></img></div></a></div>
    	              <div className="col-md-4 item"><a href="category.html">
    	                  <h4>Camera Lenses</h4>
    	                  <p>Lorem ipsum dolor sit amet</p>
    	                  <div className="image"><img src="img/cat-lenses.jpg" alt="lenses" className="img-fluid"></img></div></a></div>
    	              <div className="col-md-4 item"><a href="category.html">
    	                  <h4>Accessories</h4>
    	                  <p>Lorem ipsum dolor sit amet</p>
    	                  <div className="image"><img src="img/cat-accessories.jpg" alt="accessories" className="img-fluid"></img></div></a></div>
    	            </div>
    	          </div>
    	        </div>
    	      </section>
    	      <section className="product-1">
    	        <div className="container">
    	          <header>
    	            <h2 className="h3 heading-line">Cameras Collection</h2>
    	          </header>
    	          <div className="row d-flex flex-row align-items-stretch">
    	            <div className="col-lg-6">
    	              <div className="item item-big text-right">
    	                <h2>
    	                   
    	                  Digital <br />Cameras  
    	                </h2><a href="category.html" className="btn btn-unique btn-lg">Shop Now</a><img src="img/camera-big.jpg" alt="camera" className="img-fluid" />
    	              </div>
    	            </div>
    	            <div className="col-lg-6">
    	              <div className="row">
    	                <div className="col-md-6">
    	                  <div className="item">
    	                    <h4>EOS Digital SLR</h4>
    	                    <p className="text-primary">$1.299</p><img src="img/camera-1.jpg" alt="camera" className="img-fluid"/>
    	                    <div className="overlay d-flex align-items-center justify-content-center"><a href="detail.html" className="btn btn-unique">View Details</a></div>
    	                  </div>
    	                </div>
    	                <div className="col-md-6">
    	                  <div className="item">
    	                    <h4>EOS Digital SLR</h4>
    	                    <p className="text-primary">$1.299</p><img src="img/cat-cam.jpg" alt="camera" className="img-fluid" />
    	                    <div className="overlay d-flex align-items-center justify-content-center"><a href="detail.html" className="btn btn-unique">View Details</a></div>
    	                  </div>
    	                </div>
    	                <div className="col-md-6">
    	                  <div className="item">
    	                    <h4>EOS Digital SLR</h4>
    	                    <p className="text-primary">$1.299</p><img src="img/camera-3.jpg" alt="camera" className="img-fluid" />
    	                    <div className="overlay outStock d-flex align-items-center justify-content-center"><strong className="text-primary">Sold Out</strong></div>
    	                  </div>
    	                </div>
    	                <div className="col-md-6">
    	                  <div className="item">
    	                    <h4>EOS Digital SLR</h4>
    	                    <p className="text-primary">$1.299</p><img src="img/camera-2.jpg" alt="camera" className="img-fluid" />
    	                    <div className="overlay d-flex align-items-center justify-content-center"><a href="detail.html" className="btn btn-unique">View Details</a></div>
    	                  </div>
    	                </div>
    	              </div>
    	            </div>
    	          </div>
    	        </div>
    	      </section>
    	      <section className="sale">
    	        <div className="container">
    	          <div className="row">
    	            <div className="col-md-6">
    	              <h2>Discover 2017 Sales</h2>
    	              <p>lorem ipsum dolor sit amet consectetur adipiscing elit, ed do eiusmod tempor incididunt</p><a href="#" className="btn btn-dark shop-now">Shop Now</a>
    	            </div>
    	            <div className="col-md-6 d-none d-md-block">
    	              <div className="product"><img src="img/nikon-cam.png" alt="camera" className="img-fluid" /></div>
    	            </div>
    	          </div>
    	        </div>
    	      </section>
    	      <section className="product-2">
    	        <div className="container">
    	          <header>
    	            <h2 className="h3 heading-line">Lenses Collection</h2>
    	          </header>
    	          <div className="row">
    	            <div className="col-lg-6">
    	              <div className="row">
    	                <div className="col-md-6">
    	                  <div className="item">
    	                    <h4>Canon EOS C300</h4>
    	                    <p className="text-primary">$1.299</p><img src="img/lens-1.jpg" alt="lens" className="img-fluid" />
    	                    <div className="overlay d-flex align-items-center justify-content-center"><a href="detail.html" className="btn btn-unique">View Details</a></div>
    	                  </div>
    	                </div>
    	                <div className="col-md-6">
    	                  <div className="item">
    	                    <h4>Canon EOS C300</h4>
    	                    <p className="text-primary">$1.299</p><img src="img/lens-2.jpg" alt="lens" className="img-fluid" />
    	                    <div className="overlay d-flex align-items-center justify-content-center"><a href="detail.html" className="btn btn-unique">View Details</a></div>
    	                  </div>
    	                </div>
    	                <div className="col-md-6">
    	                  <div className="item">
    	                    <h4>Canon EOS C300</h4>
    	                    <p className="text-primary">$1.299</p><img src="img/lens-3.jpg" alt="lens" className="img-fluid" />
    	                    <div className="overlay d-flex align-items-center justify-content-center"><a href="detail.html" className="btn btn-unique">View Details</a></div>
    	                  </div>
    	                </div>
    	                <div className="col-md-6">
    	                  <div className="item">
    	                    <h4>Canon EOS C300</h4>
    	                    <p className="text-primary">$1.299</p><img src="img/lens-4.jpg" alt="lens" className="img-fluid" />
    	                    <div className="overlay d-flex align-items-center justify-content-center"><a href="detail.html" className="btn btn-unique">View Details</a></div>
    	                  </div>
    	                </div>
    	              </div>
    	            </div>
    	            <div className="col-lg-6 js-pull">
    	              <div className="item item-big">
    	                <h2>
    	                   
    	                  Zoom <br />Lenses  
    	                </h2><a href="category.html" className="btn btn-unique btn-lg">Shop Now</a><img src="img/lens-big.jpg" alt="lens" className="img-fluid" />
    	              </div>
    	            </div>
    	          </div>
    	        </div>
    	      </section>
    	      <section className="divider">
    	        <div className="container text-center">
    	          <p className="h5">New Arrival Collections</p>
    	          <h2>For your perfect photos</h2>
    	          <hr />
    	          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p><a href="#" className="btn btn-white">Learn More</a>
    	        </div>
    	      </section>
    	      <section className="newsletter">
    	        <div className="container">
    	          <div className="row">
    	            <div className="ml-auto mr-auto col-lg-8 text-center">
    	              <div className="form">
    	                <p className="h5"><span className="text-primary">Special offers </span>for subscribers</p>
    	                <h2>New Offers Every Week <span className="text-primary">& </span><br />Discount System <span className="text-primary">&  </span>Best hot prices</h2>
    	                <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, error explicabo commodi dolor ex perferendis.</p>
    	                <form>
    	                  <input id="email" type="email" name="email" placeholder="Enter your email address" />
    	                  <input type="submit" value="Subscribe" className="btn btn-unique" />
    	                </form>
    	              </div>
    	              <div className="social">
    	                <h2>We are social</h2>
    	                <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores laborum nesciunt cu.</p>
    	                <ul className="list-inline">
    	                  <li className="list-inline-item"><a href="#" target="_blank"><i className="fa fa-facebook"></i></a></li>
    	                  <li className="list-inline-item"><a href="#" target="_blank"><i className="fa fa-twitter"></i></a></li>
    	                  <li className="list-inline-item"><a href="#" target="_blank"><i className="fa fa-instagram"></i></a></li>
    	                  <li className="list-inline-item"><a href="#" target="_blank"><i className="fa fa-behance"></i></a></li>
    	                  <li className="list-inline-item"><a href="#" target="_blank"><i className="fa fa-pinterest"></i></a></li>
    	                </ul>
    	              </div>
    	            </div>
    	          </div>
    	        </div>
    	      </section>
    	      <Footer />
    	    </div>
    );
  }
}

export default Homepage;