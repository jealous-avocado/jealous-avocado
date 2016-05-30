import React from 'react'
import {Route, Router, Link, hashHistory} from 'react-router';
import {render} from 'react-dom';
import App from './components/App';
import Signin from './components/Signin';

render(<Router>
  <Route path='/' component={App} />
  <Route path='/signin' component={Signin} />
  </Router>, document.getElementById('app'));