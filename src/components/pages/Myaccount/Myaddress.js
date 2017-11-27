import React, { Component } from 'react';
import AddressData from './AddressData.js'

class Myaddress extends Component {
  
   render() {
    const addresses = this.props.data.map((alldata, index) => {
      return (
    		  <option key={ alldata.addressId } value={ alldata.addressId }>{ alldata.address1 }, { alldata.address2 }, { alldata.city }, { alldata.country }</option>
      );
    });

    return (
			<div className="col-lg-8">
				<div className="padding-top-2x mt-2 hidden-lg-up"></div>
				<h4>Address</h4>
				<hr className="padding-bottom-1x"/>
				<div className="row">
					<div className="col-md-12">
						<div className="form-group">
							<label for="account-country">Address</label>
							<select className="form-control" id="account-country">
								{addresses}
							</select>
						</div>
					</div>	
				</div>
				<AddressData />
			</div>
    );
  }
}

export default Myaddress;