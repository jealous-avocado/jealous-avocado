 // import { UPDATE_CURRENT_USER }

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
          username: action.name
        }
      });
    case "UPDATE_CURRENT_STREAMER":
      return Object.assign({}, state, {
        currentStreamers: action.currentStreamers
      });
    default:
      return state;
  }
 };

 export default reducer;