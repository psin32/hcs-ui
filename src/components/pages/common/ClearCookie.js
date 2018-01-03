import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import Logout from '../Logout/Logout.js'
import Cookies from 'universal-cookie';

class ClearCookie extends Component {

	componentDidMount() {
		const cookies = new Cookies();
		const token = cookies.get('TOKEN');
		cookies.remove('TOKEN', { path: '/' });
		cookies.remove('USER_ID', { path: '/' });
		cookies.remove('USERNAME', { path: '/' });
		cookies.remove('BASKET_COUNT', { path: '/' });
		cookies.remove('REGISTER_TYPE', { path: '/' });
		console.log(this.props.location.hash);

		if(this.props.location.hash === '#timeout') {
			this.props.history.push("/timeout");
		} else if(this.props.location.hash === '#logout') {
			this.props.history.push("/logout");
		} else if(this.props.location.hash === '#accessdenied') {
			this.props.history.push("/accessdenied");
		} else {
			this.props.history.push("/logout");
		}
	}

  render() {
    return (
		<Logout />
    );
  }
}

export default withRouter(ClearCookie);