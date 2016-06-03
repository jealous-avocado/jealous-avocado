const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';
const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
const UPDATE_CURRENT_STREAMER = 'UPDATE_CURRENT_STREAMER';


let actions = {
  signinUser: (username) => {
    return {
      type: UPDATE_CURRENT_USER,
      name: username
    }
  }, 

  updateTopic: (topic) => {
    return {
      type: UPDATE_TOPIC, 
      topic: topic
    }
  }, 

  logoutUser: () => {
    return {
      type: LOGOUT_CURRENT_USER,
      name: null
    }
  },

  updateCurrentStreamers: (streamer) => {
    return {
      type: UPDATE_CURRENT_STREAMER,
      currentStreamers: streamer
    }
  }
};

export default actions;