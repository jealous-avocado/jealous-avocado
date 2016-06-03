import { applyMiddleware, compose, createStore } from 'redux';
import reducer from './reducers';
import logger from 'redux-logger';

let finalcreateStore = compose(
  applyMiddleware(logger())
)(createStore);

export default function configureStore(
  initialState = {
    user: {
      username: null, 
      stream: {
        title: null, 
        hashtags: []
      }
    }
  }
) {
  return finalcreateStore(reducer, initialState);
}
