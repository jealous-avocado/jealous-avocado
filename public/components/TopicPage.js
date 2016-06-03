import NewsArticles from './NewsArticles';
import NewsVideos from './NewsVideos';
import { connect } from 'react-redux';
import actions from '../redux/actions';

class TopicPage extends React.Component {
  constructor() {
    super();
  }

  topicClickHandler(clickedTopic) {
    // this.setState({ topic: clickedTopic});
  }

  componentWillMount() {
    const topic = this.props.params.topic ? this.props.params.topic.toUpperCase() : 'World News';

    this.props.dispatch(actions.updateTopic(topic));

  }

  render() {
    return (
      <div>
        <div> The Latest in {this.props.newsTopic} </div> <br></br>
        
        <div className='col-md-7'>
          <NewsArticles topic={this.props.newsTopic} articles={this.props.articles} dispatch={this.props.dispatch}/>
        </div>
        <div className='col-md-5'>
          <NewsVideos topic={this.props.newsTopic}/>
        </div>
      </div>
    );
  }

};

function mapStatetoProps(state) {
  return state;
}

export default connect(mapStatetoProps)(TopicPage);