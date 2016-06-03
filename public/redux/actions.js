const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';
const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
<<<<<<< 4b4d526a536f32c0588b4873d4bab89af6c8e255
=======
const UPDATE_BROADCASTER_STREAM_TOPIC = 'UPDATE_BROADCASTER_STREAM_TOPIC';
const UPDATE_BROADCASTER_STREAM_HASHTAGS = 'UPDATE_BROADCASTER_STREAM_HASHTAGS';
const UPDATE_NEWS_PAGE_TOPIC = 'UPDATE_NEWS_PAGE_TOPIC';
>>>>>>> add functionality to topicPage and streamPageComp


let actions = {
  signinUser: (username) => {
    return {
      type: UPDATE_CURRENT_USER,
      name: username
    }
  }, 

  updateTopic: (topic) => {
    return {
      type: UPDATE_NEWS_PAGE_TOPIC, 
      topic: topic
    }
  }, 

  logoutUser: () => {
    return {
      type: LOGOUT_CURRENT_USER
    }
  }
};

export default actions;