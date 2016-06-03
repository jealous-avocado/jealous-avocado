 // import { UPDATE_CURRENT_USER }

function getHashtagID(state) {
  return state.user.stream.hashtags.reduce((memo, hashtag) => {
    return Math.max(memo, hashtag.id);
  }, -1) + 1;
}


let reducer = function(state, action) {
  switch(action.type) {
    case "UPDATE_CURRENT_USER": 
      return Object.assign({}, state, {
        user: {
          username: action.name, 
          stream: state.user.stream
        }
      });
    case "LOGOUT_CURRENT_USER":
      return Object.assign({}, state, {
        user: {
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
        }
      });
    default:
      return state;
  }
 };

 export default reducer;