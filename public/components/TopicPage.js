import NewsArticles from './NewsArticles';
import NewsVideos from './NewsVideos';


class TopicPage extends React.Component {
  constructor() {
    super();
    this.state = {
      topic: null
    };
  }

  topicClickHandler(clickedTopic) {
    // this.setState({ topic: clickedTopic});
  }

  //
  render() {
    <div>
      <div> Topic Page </div> <br></br>

      <div className='row'>
        <div className="col-md-6">
          //set up tabs
          <NewsArticles />
        </div>
        <div className="col-md-6">
          <NewsVideos />
        </div>
      </div>
    </div>
  }

};

export default TopicPage;