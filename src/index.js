import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Homepage from './components/pages/Homepage/Homepage';
import Login from './components/pages/Login/Login';
import Registration from './components/pages/Registration/Registration';
import Myaccount from './components/pages/Myaccount/MyaccountLanding';
import ClearCookie from './components/pages/common/ClearCookie';
import Logout from './components/pages/Logout/Logout';
import Timeout from './components/pages/Timeout/Timeout';
import AccessDenied from './components/pages/AccessDenied/AccessDenied';
import PageNotFound from './components/pages/PageNotFound/PageNotFound';
import PDP from './components/pages/PDP/ProductDetail.js';
import Category from './components/pages/Category/Category.js';
import Basket from './components/pages/Basket/Basket.js';
import Checkout from './components/pages/Checkout/Checkout.js';
import OrderConfirmation from './components/pages/Checkout/OrderConfirmation.js';
import CheckoutLogin from './components/pages/Checkout/CheckoutLogin.js';

ReactDOM.render(
		<BrowserRouter>
			<div>
				<Switch>
					<Route exact path="/" component={Homepage} ></Route>
					<Route path="/login" component={Login} ></Route>
					<Route path="/registration" component={Registration} ></Route>
					<Route path="/myaccount" component={Myaccount} ></Route>
					<Route path="/clearcookie" component={ClearCookie} ></Route>
					<Route path="/logout" component={Logout} ></Route>
					<Route path="/timeout" component={Timeout} ></Route>
					<Route path="/accessdenied" component={AccessDenied} ></Route>
					<Route path="/product/:productname" component={PDP} ></Route>
					<Route path="/category/:category" component={Category} ></Route>
					<Route path="/basket" component={Basket} ></Route>
					<Route path="/checkout" component={Checkout} ></Route>
					<Route path="/confirmation" component={OrderConfirmation} ></Route>
					<Route path="/checkoutlogin" component={CheckoutLogin} ></Route>
					<Route path="*" component={PageNotFound} status={404}/>
				</Switch>
			</div>
		</BrowserRouter>,
document.getElementById('root'));

