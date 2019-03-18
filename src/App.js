import React, { Component } from 'react';

import { Provider }         from "react-redux"
import store                from "./store"

import { Router, Route }    from "react-router-dom";
import history              from "./history"

import Home from './Components/Home'

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Router history={history}>
            <div>
              <Route path="/" component={Home}/>
            </div>
          </Router>
        </Provider>
      </div>

    );
  }
}

export default App;
