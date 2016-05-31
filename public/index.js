import React from 'react';
import {Route, Router, Link, browserHistory} from 'react-router';
import {render} from 'react-dom';
import routes from './components/routes.js';


render((
  <Router routes={routes} history={browserHistory} />
  ), document.getElementById('app'));