 // import { UPDATE_CURRENT_USER }

<<<<<<< d639739ebfecd4a327643b43d2e8e8268cb26820
=======
function getHashtagID(state) {
  return state.user.stream.hashtags.reduce((memo, hashtag) => {
    return Math.max(memo, hashtag.id);
  }, -1) + 1;
}


>>>>>>> more work on streamPage
let reducer = function(state, action) {
  switch(action.type) {
    case "UPDATE_CURRENT_USER": 
      return Object.assign({}, state, {
        user: {
          username: action.name
        }
      });
    case "LOGOUT_CURRENT_USER":
      return Object.assign({}, state, {
        user: {
<<<<<<< 4b4d526a536f32c0588b4873d4bab89af6c8e255
<<<<<<< d639739ebfecd4a327643b43d2e8e8268cb26820
          username: action.name
=======
          username: action.name, 
          stream: state.user.stream
=======
          username: null, 
          stream: {
            title: null, 
            hashtags: []
          }
>>>>>>> add functionality to topicPage and streamPageComp
        }
      });
    case "UPDATE_BROADCASTER_STREAM_TOPIC":
      return Object.assign({}, state, {
        user: {
          username: state.user.username,
          stream: {
            title: action.title, 
            hashtags: state.user.stream.hashtags
          }
        }
      });
    case "UPDATE_BROADCASTER_STREAM_HASHTAGS":
      return Object.assign({}, state, {
        user: {
          username: state.user.username,
          stream: {
            title: state.user.stream.title,
            hashtags: [
              {
                id: getHashtagID(state), 
                hashtag: action.hashtag
              }, ...state.user.stream.hashtags]
          }
>>>>>>> more work on streamPage
        }
      });
<<<<<<< 4b4d526a536f32c0588b4873d4bab89af6c8e255

=======
    case "UPDATE_NEWS_PAGE_TOPIC":
      return Object.assign({}, state, {
        newsTopic: action.topic
      });
>>>>>>> add functionality to topicPage and streamPageComp
    default:
      return state;
  }
 };

 export default reducer;