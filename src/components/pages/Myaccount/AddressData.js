import React, { Component } from 'react';

class AddressData extends Component {
  
   render() {
	   
    return (
			<form className="row">
				<div className="col-md-6">
					<div className="form-group">
						<label for="account-company">Title</label>
						<input className="form-control" type="text" id="title" name="title" value="Title"/>
					</div>
				</div>
				<div className="col-md-6">
					<div className="form-group">
						<label for="account-company">Firstname</label>
						<input className="form-control" type="text" id="firstname" name="firstname" value="Firstname"/>
					</div>
				</div>
				<div className="col-md-6">
					<div className="form-group">
						<label for="account-company">Lastname</label>
						<input className="form-control" type="text" id="lastname" name="lastname" value="Lastname"/>
					</div>
				</div>
				<div className="col-md-6">
					<div className="form-group">
						<label for="account-company">Email Address</label>
						<input className="form-control" type="email" id="email" name="email" value="Email Address"/>
					</div>
				</div>
				<div className="col-md-6">
					<div className="form-group">
						<label for="account-company">Address Line 1</label>
						<input className="form-control" type="text" id="line1" name="line1" value="Email Address"/>
					</div>
				</div>
				<div className="col-md-6">
					<div className="form-group">
						<label for="account-company">Address Line 2</label>
						<input className="form-control" type="text" id="line2" name="line2" value="Email Address"/>
					</div>
				</div>
				<div className="col-md-6">
					<div className="form-group">
						<label for="account-company">Address Line 3</label>
						<input className="form-control" type="text" id="line3" name="line3" value="Email Address"/>
					</div>
				</div>
				<div className="col-md-6">
					<div className="form-group">
						<label for="account-company">city</label>
						<input className="form-control" type="text" id="city" name="city" value="City"/>
					</div>
				</div>
				<div className="col-md-6">
					<div className="form-group">
						<label for="account-zip">ZIP Code</label>
						<input className="form-control" type="text" id="account-zip" required=""/>
					</div>
				</div>
				<div className="col-md-6">
					<div className="form-group">
						<label for="account-country">Country</label>
						<select className="form-control" id="account-country">
							<option>Choose country</option>
							<option>Australia</option>
							<option>Canada</option>
							<option>France</option>
							<option>Germany</option>
							<option>Switzerland</option>
							<option selected="">United States</option>
						</select>
					</div>
				</div>
				<div className="col-12 padding-top-1x">
					<h4>Address Type</h4>
					<hr className="padding-bottom-1x"/>
					<label className="custom-control custom-checkbox d-block">
						<input className="custom-control-input" type="checkbox" checked="true"/><span className="custom-control-indicator"></span><span className="custom-control-description">Shipping Address</span>
					</label>
					<label className="custom-control custom-checkbox d-block">
						<input className="custom-control-input" type="checkbox" checked="true"/><span className="custom-control-indicator"></span><span className="custom-control-description">Billing Address</span>
					</label>
					<hr className="margin-top-1x margin-bottom-1x"/>
					<div className="text-right">
						<button className="btn btn-primary margin-bottom-none" type="button" data-toast="" data-toast-position="topRight" data-toast-type="success" data-toast-icon="icon-circle-check" data-toast-title="Success!" data-toast-message="Your address updated successfuly.">Save</button>
					</div>
				</div>
			</form>
    );
  }
}

export default AddressData;