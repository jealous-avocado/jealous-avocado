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
      $('#startStream').hide();
      $('#stopStream').show();

      componentContext.props.dispatch(actions.updateCurrentStreamer(componentContext.props.user.username));
      $.post('/currentStreamer',{username:componentContext.props.user.username,isStreaming: true});
      window.localStorage.setItem('state', JSON.stringify(componentContext.props));

    };

    document.querySelector('#stopStream').onclick = function() {
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

  render() {
    return (
      <div>
        <div>User Page </div>

        <ToggleDisplay show={this.matchUsertoURL.bind(this)()}>

          <ToggleDisplay show={!this.props.user.stream.title}>
            <form onSubmit={this.saveStreamTitle.bind(this)}>
              <input id='streamTitleInput' placeholder='Title the stream'/>
            </form>
          </ToggleDisplay>
          
          <form onSubmit={this.saveHashTags.bind(this)}>
            <input id='hashTagInput' placeholder='Enter a topic tag'/>
          </form>
          
          <button id='startStream'> Start Stream </button>
          <button id='stopStream' style={{'display': 'none'}}> Stop Stream </button>

        </ToggleDisplay>

        <br></br>

        <div id='streamTitle'>Stream title: {this.props.user.stream.title}</div>

        <div id="streamContainer"></div>
        <div>
        Hashtags: &nbsp;
          {
            this.props.user.stream.hashtags.map(tag => {
              return <HashTagComp key={tag.id} removeTag={this.removeTag} tag={tag}/>
            })
          }
        </div>
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return state;
}

export default connect(mapStatetoProps)(StreamPageComp);