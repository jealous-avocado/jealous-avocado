import NewsArticles from './NewsArticles';
import NewsVideos from './NewsVideos';
import { connect } from 'react-redux';

class TopicPage extends React.Component {
  constructor() {
    super();
  }

  topicClickHandler(clickedTopic) {
    // this.setState({ topic: clickedTopic});
  }

  componentWillMount() {
    const topic = this.props.params.topic;
    console.log(topic, 'topic');
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
        <div className='col-md-7'>
          <NewsArticles topic={this.state.topic}/>
        </div>
        <div className='col-md-5'>
          <NewsVideos topic={this.state.topic}/>
        </div>
      </div>
    );
  }

};

function mapStatetoProps(state) {
  return state;
}

export default connect(mapStatetoProps)(TopicPage);