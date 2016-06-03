import { applyMiddleware, compose, createStore } from 'redux';
import reducer from './reducers';
import logger from 'redux-logger';

let finalcreateStore = compose(
  applyMiddleware(logger())
)(createStore);

<<<<<<< 4b4d526a536f32c0588b4873d4bab89af6c8e255
export default function configureStore(initialState = {user: { username: null}}) {
=======
export default function configureStore(
  initialState = {
    user: {
      username: null, 
      stream: {
        title: null, 
        hashtags: []
      }
    }, 
    newsTopic: 'WORLD NEWS'
  }
) {
>>>>>>> add functionality to topicPage and streamPageComp
  return finalcreateStore(reducer, initialState);
}
