import ToggleDisplay from 'react-toggle-display';
import { connect } from 'react-redux';
import HashTagComp from './HashTagComp';
import actions from '../redux/actions';


class StreamPageComp extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    var connection = new RTCMultiConnection().connect(); 
    

    connection.body = document.getElementById('streamContainer');

    var componentContext = this;
    
    document.querySelector('#startStream').onclick = function() {
      connection.open();
      connection.direction = 'one-way';

      // componentContext.props.dispatch(actions.saveBroadcastConnection(connection));
      

      componentContext.props.dispatch(actions.updateCurrentStreamer(componentContext.props.user.username));
      $.post('/currentStreamers',{username:componentContext.props.user.username,isStreaming: true});
      window.localStorage.setItem('state', JSON.stringify(componentContext.props));

      $('#startStream').hide();
      $('#stopStream').show();
      window.open('http://localhost:3000');
    };

    document.querySelector('#stopStream').onclick = function() {
      $.post('/currentStreamer',{username:componentContext.props.user.username,isStreaming: false});
      connection.close();
      $('#stopStream').hide();
      $('#startStream').show();
      $('#streamTitleInput').val('').show();
    };

  }

  matchUsertoURL() {
    return this.props.user.username === this.props.params.username;
  }

  saveStreamTitle(e) {
    e.preventDefault();

    let streamTitleVal = $(streamTitleInput).val();

    this.props.dispatch(
      actions.updateBroadcasterStreamTopic(streamTitleVal)
    );
  }

  saveHashTags(e) {
    e.preventDefault();

    let hashTagVal = $(hashTagInput).val();
    $(hashTagInput).val('');

    this.props.dispatch(
      actions.updateBroadcasterStreamHashtags(hashTagVal)
    );
  }

  removeTag(e) {
    $(e.currentTarget).remove();
  }

  editStreamTitle() {
    this.props.dispatch(
      actions.updateBroadcasterStreamTopic('')
    );
  }

  componentDidUpdate() {
    $(streamTitleInput).focus();
  }

  render() {
    return (
      <div>
        <div id='userStreamCol' className='col-md-8'>
          <div>
            <div id='streamTitle' onClick={this.editStreamTitle.bind(this)}>{this.props.user.stream.title}</div>
            <div id="streamContainer"></div>
            <div id='streamOptionsContainer'>
              <ToggleDisplay show={this.matchUsertoURL.bind(this)()}>
                <button id='startStream' className="btn btn-default"> Start Stream </button>
                <button id='stopStream' className="btn btn-default" style={{'display': 'none'}}> Stop Stream </button>
              </ToggleDisplay>
            </div>
          </div>
        </div>

        <div id='userDashCol' className='col-md-4'>
          <div id='dashboardText'> Dashboard </div>

            <div> Stream Title: &nbsp; <span id='streamTitle' onClick={this.editStreamTitle.bind(this)}>{this.props.user.stream.title}</span>
            </div>
            <ToggleDisplay show={!this.props.user.stream.title}>
              <div>
                <form id='streamTitleForm' onSubmit={this.saveStreamTitle.bind(this)}>
                  <input className="form-control" id='streamTitleInput' placeholder='Title the stream'/>
                </form>
              </div>
            </ToggleDisplay>
            
            <div> 
            Hashtags: &nbsp;
              <div>
              
                {
                  this.props.user.stream.hashtags.map(tag => {
                    return <HashTagComp key={tag.id} removeTag={this.removeTag} tag={tag}/>
                  })
                }
              </div>
            </div>
            <div>
              <form onSubmit={this.saveHashTags.bind(this)}>
                <input className="form-control" id='hashTagInput' placeholder='Enter a topic tag'/>
              </form>
            </div>

        </div>

      </div>
    )
  }
}

function mapStatetoProps(state) {
  return state;
}

export default connect(mapStatetoProps)(StreamPageComp);