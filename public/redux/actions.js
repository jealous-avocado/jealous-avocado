const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';

let actions = {
  updateUser: (username) => {
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
  }
};

export default actions;