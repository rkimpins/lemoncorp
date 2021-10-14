import './App.css';
import React, {Component} from 'react';
import 'react-bootstrap/dist/react-bootstrap.min.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Resume from './components/Resume/Resume';
import Portfolio from "./components/Portfolio/Portfolio";
import War from './components/Projects/War/War';
import BugElo from './components/Projects/BugElo/BugElo';
import Chopsticks from './components/Projects/Chopsticks/Chopsticks';
import IntegerSequences from './components/Projects/IntegerSequences/IntegerSequences';
import Phase10 from './components/Projects/Phase10/Phase10';
import voronoi from './components/Voronoi/Voronoi';


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
          <Route exact path="/resume" component={Resume}></Route>
          <Route exact path="/portfolio" component={Portfolio}></Route>
          <Route exact path="/war" component={War}></Route>
          <Route exact path="/BugElo" component={BugElo}></Route>
          <Route exact path="/chopsticks" component={Chopsticks}></Route>
          <Route exact path="/IntegerSequences" component={IntegerSequences}></Route>
          <Route exact path="/Phase10" component={Phase10}></Route>
          <Route exact path="/Voronoi" component={voronoi}></Route>
        </Router>
      </div>
    );
  }
}

export default App;
