
import { connect } from 'react-redux';
import actions from '../redux/actions';
import Preview from './Preview';
var socket;

class PublicPage extends React.Component {
  constructor(props) {
    super(props);
  
  }

  componentWillMount() {
    $('body').css('background-image', 'none');
    socket = io.connect();
  }

  updateCurrentVideo(event) {
    var src = $(event.currentTarget).find('iframe').attr('src');
    $('#currentVideo').attr('src', src);
  }

  refreshBroadcast() {
    var componentContext = this;
    componentContext.props.dispatch(actions.resetCurrentStreamer());
    $.get('/currentStreamers')
    .done(r => {
      r.forEach(function (value) {
        componentContext.props.dispatch(actions.updateCurrentStreamer(value));
        $('#video').append('<div id="previewContainer"></div>');
        var connection = new RTCMultiConnection(value).connect();
        connection.body = document.getElementById('previewContainer');
        
        connection.session = {
              video: true,
              screen: true,
              audio: true,
              oneway: true
          };
        socket.emit('join-broadcast', {
              broadcastid: value,
              userid: connection.userid,
              typeOfStreams: connection.session
          });
      });
      window.localStorage.setItem('state', JSON.stringify(this.props));

    })
    .fail(e => console.log('Error in get request: ', e));
  }

  render() {
    return (
      <div>
        <div className='row'>
          <div className="col-md-8"> <h2>Current Video</h2> 
            <iframe id="currentVideo" width="711" height="400" src="" frameBorder="0" allowFullScreen></iframe>            
          </div>
          <div className="col-md-4"> <h2 id='broadcast'>Currently Broadcasting</h2>
          <button type="button" class="btn btn-success" onClick={this.refreshBroadcast.bind(this)}>Refresh Broadcast</button>
            <ul id='video'>
            </ul>

          </div>
        </div>
      </div>
    );
  }
}

function mapStatetoProps(state) {
  return state;
}

export default connect(mapStatetoProps)(PublicPage);