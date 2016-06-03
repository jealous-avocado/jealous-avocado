import React from 'react';
import {Route, Router, Link, browserHistory} from 'react-router';
import {render} from 'react-dom';
import routes from './components/routes.js';
import configureStore from './redux/store';
import { Provider } from 'react-redux';

let state = (window.localStorage.state === undefined) ? JSON.parse(window.localStorage.state) : null;

let initialState = {
  user: {
    username: state ? state.user.username : null
  },
  currentStreamers: state ? state.currentStreamers : []
};



let store = configureStore(initialState);


render((
  <Provider store = {store} >
    <Router routes={routes} history={browserHistory} />
  </Provider>
  ), document.getElementById('app'));