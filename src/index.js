import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import Homepage from './components/pages/Homepage/Homepage';
import Login from './components/pages/Login/Login';
import Registration from './components/pages/Registration/Registration';

ReactDOM.render(
		<BrowserRouter>
			<div>
				<Route exact path="/" component={Homepage} ></Route>
				<Route path="/login" component={Login} ></Route>
				<Route path="/registration" component={Registration} ></Route>
			</div>
		</BrowserRouter>,
document.getElementById('root'));
