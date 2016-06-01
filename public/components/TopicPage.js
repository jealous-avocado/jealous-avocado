import NewsArticles from './NewsArticles';
import NewsVideos from './NewsVideos';


class TopicPage extends React.Component {
  constructor() {
    super();
    this.state = {
      topic: 'World News'
    };
  }

  topicClickHandler(clickedTopic) {
    // this.setState({ topic: clickedTopic});
  }

  componentWillMount() {
    const topic = window.location.pathname.split('news/')[1];
    if (topic) {
      this.setState({
        topic: topic
      });
    }

  }

  render() {
    return (
      <div>
        <div> Topic Page </div> <br></br>
        <div> {this.state.topic} </div>
        <NewsArticles topic={this.state.topic}/>
      </div>
    );
  }

};

export default TopicPage;