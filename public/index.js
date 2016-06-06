import React from 'react';
import {Route, Router, Link, browserHistory} from 'react-router';
import {render} from 'react-dom';
import routes from './components/routes.js';
import configureStore from './redux/store';
import { Provider } from 'react-redux';

let state = window.localStorage.state ? JSON.parse(window.localStorage.state) : null;


let store = configureStore();

if (state) {
  let initialState = {
    user: {
      username: state.user.username,
      stream: {
        title: state.user.stream.title, 
        hashtags: state.user.stream.hashtags
      }
    },
    newsTopic: state.newsTopic,
    articles: state.articles,
    currentStreamers: state.currentStreamers
  };  
  
  store = configureStore(initialState);
} 


render((
  <Provider store = {store} >
    <Router routes={routes} history={browserHistory} />
  </Provider>
  ), document.getElementById('app'));