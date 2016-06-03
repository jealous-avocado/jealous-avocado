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
<<<<<<< d639739ebfecd4a327643b43d2e8e8268cb26820
          username: action.name
=======
          username: action.name, 
          stream: state.user.stream
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

    default:
      return state;
  }
 };

 export default reducer;