import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload. Prashant Singh
        </p>
        <div className="container-fluid">
	        <div className="row">
	          <div className="col-md-4">.col-md-4</div>
	          <div className="col-md-4">.col-md-4</div>
	          <div className="col-md-4">.col-md-4</div>
	        </div>
        </div>
      </div>
    );
  }
}

export default App;
