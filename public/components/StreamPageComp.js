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

    //please note that streamTitleInput will refer to id 'streamTitleInput' by nature of react. 
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
      actions.updateStreamHashtags(hashTagVal)
    );
  }

  removeTag(e) {
    //has bugs...FIX ME!

    let hashText = $(e.currentTarget).find('.tagText')[0].innerText;
    $(e.currentTarget).remove();

    this.props.dispatch(
      actions.removeStreamHashtags(hashText)
    );
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
            <input id='hashTagInput' placeholder='Enter a hashtag'/>
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
              return <HashTagComp removeTag={this.removeTag.bind(this)} tag={tag}/>
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