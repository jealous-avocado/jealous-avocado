import React from 'react';
import {Route, Router, Link, browserHistory} from 'react-router';
import {render} from 'react-dom';
import App from './components/App';
import Signin from './components/Signin';
import StreamPageComp from './components/StreamPageComp';


render((
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='/signin' component={Signin} />
      <Route path='/:username' component={StreamPageComp} />
    </Route>
  </Router>
  ), document.getElementById('app'));