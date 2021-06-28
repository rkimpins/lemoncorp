import './App.css';
import Portfolio from "./components/Portfolio/Portfolio";
import React, {Component} from 'react';
import 'react-bootstrap/dist/react-bootstrap.min.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import War from './components/Projects/War/War';
import BugElo from './components/BugElo/BugElo';

import NavigationBar from './components/Navigation/NavigationBar';
class App extends Component {
  render () {
          //<Route exact path="/contact" component={<p>Contact</p>}></Route>
    return (
      <div className="App">
        <Router>
          <NavigationBar></NavigationBar>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/about" component={About}></Route>
          <Route exact path="/contact" component={Contact}></Route>
          <Route exact path="/portfolio" component={Portfolio}></Route>
          <Route exact path="/war" component={War}></Route>
          <Route exact path="/elo" component={BugElo}></Route>
        </Router>
      </div>
    );
  }
}

export default App;
