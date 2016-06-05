const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER';
const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
const UPDATE_BROADCASTER_STREAM_TOPIC = 'UPDATE_BROADCASTER_STREAM_TOPIC';
const UPDATE_BROADCASTER_STREAM_HASHTAGS = 'UPDATE_BROADCASTER_STREAM_HASHTAGS';
const UPDATE_NEWS_PAGE_TOPIC = 'UPDATE_NEWS_PAGE_TOPIC';
const UPDATE_NEWS_ARTICLES = 'UPDATE_NEWS_ARTICLES';


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

  updateNewsArticles: (articles) => {
    return {
      type: UPDATE_NEWS_ARTICLES,
      articles: articles
    }
  },

  fetchNewsArticles: (query) => {
    //async fetch to alchemy api or nyt api
    //return a function that returns a promised fetch request
    /*
    var context = this;
    return dispatch => {
      //dispatch another action that tells user that we are fetching ??
      return fetch(url+query)
        .then(result => dispatch(context.updateNewsArticles(result)));
    }
    */
  },

  updateNewsArticles: (articles) => {
    return {
      type: UPDATE_NEWS_ARTICLES,
      articles: articles
    }
  },

  fetchNewsArticles: (query) => {
    //async fetch to alchemy api or nyt api
    //return a function that returns a promised fetch request
    /*
    var context = this;
    return dispatch => {
      //dispatch another action that tells user that we are fetching ??
      return fetch(url+query)
        .then(result => dispatch(context.updateNewsArticles(result)));
    }
    */
  },

  logoutUser: () => {
    return {
      type: LOGOUT_CURRENT_USER
    }
  },
  updateCurrentStreamer: (streamer) => {
    return {
      type: UPDATE_CURRENT_STREAMER,
      addStreamer: streamer
    }
  }
};

export default actions;