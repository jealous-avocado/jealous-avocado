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

    default:
      return state;
  }
 };

 export default reducer;