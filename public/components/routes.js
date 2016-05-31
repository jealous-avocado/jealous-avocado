import React from 'react';
import { Route, IndexRoute } from 'react-router'; 
import App from './App.js';
import Signin from './Signin.js';
import TopicPage from './TopicPage.js';
import StreamPageComp from './StreamPageComp';

module.exports = (
  <Route path='/' component={App}>
    <Route path='/signin' component={Signin} />
    <Route path='/:username' component={StreamPageComp} />
    <Route path='/news' component={TopicPage} />
  </Route>
)