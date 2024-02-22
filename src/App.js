// src/App.js
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Authen from './components/Authen';
import Home from './components/Home';
import Dashboard from './components/Dashboard/Dashboard'; // Updated import path
import About from './components/About';
import ContactUs from './components/ContactUs';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={ContactUs} />
            <Route path="/login" component={Authen} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
