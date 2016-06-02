import React from 'react';
import { Route, IndexRoute } from 'react-router'; 
import App from './App';
import Signin from './Signin';
import TopicPage from './TopicPage';
import StreamPageComp from './StreamPageComp';
import NewsArticles from './NewsArticles';
import PublicPage from './PublicPage';

module.exports = (
  <Route path='/' component={App}>
    <IndexRoute component={PublicPage} />
    <Route path='/signin' component={Signin} />
    <Route path='/news' component={TopicPage}> 
      <Route path='/news/:topic' component={NewsArticles}/>
    </Route>
    <Route path='/:username' component={StreamPageComp} />
  </Route>
)