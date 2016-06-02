import NewsArticles from './NewsArticles';
import NewsVideos from './NewsVideos';
import { connect } from 'react-redux';

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
    console.log('userTP: ', this.props.user.username);

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