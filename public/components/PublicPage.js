
import { connect } from 'react-redux';
import actions from '../redux/actions';

class PublicPage extends React.Component {
  constructor(props) {
    super(props);
  
  }

  componentWillMount() {
    $('body').css('background-image', 'none');
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
      });
      window.localStorage.setItem('state', JSON.stringify(this.props));
    })
    .fail(e => console.log('Error in get request: ', e));
  }
  
  componentDidMount () {
    console.log(this.props.currentStreamers);
    $('iframe').on('load', function () {
      $("iframe").contents().find('.navbar').hide();
      $("iframe").contents().find('#streamTitle').hide();
      $("iframe").contents().find('#userPage').hide();
      $("iframe").contents().find('#userDashCol').hide();


    });
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
              {this.props.currentStreamers.map((video) => 
                  <li className="video" onClick={this.updateCurrentVideo}> 
                <div className="videoWrapper">
                    <iframe width="142" height="80" src={"http://localhost:3000/" + video} frameBorder="0" allowFullScreen></iframe>        
                </div>
                  {video + " is reporting on " + this.props.user.stream.title}
                  </li>
              )}
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