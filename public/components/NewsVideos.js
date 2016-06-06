
import { connect } from 'react-redux';
import actions from '../redux/actions';
import NewsVideoEntry from './NewsVideoEntry';

class NewsVideos extends React.Component {
  constructor(props) {
    super(props);
  }

  updateCurrentVideo(event) {
    var src = $(event.currentTarget).find('iframe').attr('src');
    $('#currentVideo').attr('src', src);
  }

  componentDidMount () {
    $('iframe').on('load', function () {
      $("iframe").contents().find('#app').hide()
    });
  }


  render() {
    return (
      <div>
        <div className="col-md-4"> <h2 id='broadcast'>Currently Broadcasting</h2>
          <ul id='video'>
            {
              this.props.currentStreamers.map((video, idx) => {
                <NewsVideoEntry key = {idx} idx={idx} updateCurrentVideo={this.updateCurrentVideo} video = {video} user={this.props.user} />
              })
            }
          </ul>
        </div>
      </div>
    )
  }
  
};

function mapStatetoProps(state) {
  return state;
}

export default connect(mapStatetoProps)(NewsVideos);