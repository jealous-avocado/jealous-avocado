const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';
const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
const UPDATE_BROADCASTER_STREAM_TOPIC = 'UPDATE_BROADCASTER_STREAM_TOPIC';
const UPDATE_BROADCASTER_STREAM_HASHTAGS = 'UPDATE_BROADCASTER_STREAM_HASHTAGS';

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
  }, //for when a user clicks on a topic

  updateBroadcasterStreamTopic: (title) => {
    return {
      type: UPDATE_BROADCASTER_STREAM_TOPIC, 
      title: title
    }
  },

  updateBroadcasterStreamHashtags: (hashtag) => {
    return {
      type: UPDATE_BROADCASTER_STREAM_HASHTAGS, 
      hashtag: hashtag,
    }
  },

  logoutUser: () => {
    return {
      type: LOGOUT_CURRENT_USER,
      name: null
    }
  }
};

export default actions;