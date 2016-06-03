import ToggleDisplay from 'react-toggle-display';
import { connect } from 'react-redux';

class StreamPageComp extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    var connection = new RTCMultiConnection().connect();
    
    document.querySelector('#startStream').onclick = function() {
      connection.open();
      connection.direction = 'one-way';
      $('#startStream').hide();
      $('#stopStream').show();


      let streamTitle = $('#streamTitleInput').val();
      

      componentContext.props.dispatch( 
        actions.updateBroadcasterStreamTopic(streamTitle)
      );

      console.log(componentContext.props.user, 'PROPS');


    };

    document.querySelector('#stopStream').onclick = function() {
      connection.close();
      $('#stopStream').hide();
      $('#startStream').show();
   };

    document.querySelector('#enterHashTags').onclick = function() {
      
      let hashTagInput = $('#hashTagInput').val();
      componentContext.props.dispatch(
        actions.updateBroadcasterStreamHashtags(hashTagInput)
      );

    };

  }

  matchUsertoURL() {
    return this.props.user.username === this.props.params.username;
  }

  render() {
    return (
      <div>
        <div>User Page </div>

        <ToggleDisplay show={this.matchUsertoURL.bind(this)()}>

          <button id='startStream'> Start Stream </button>


          <input id='streamTitleInput' placeholder='Title the stream'/>
          <button id='startStream'> Start Stream </button>
          
          <input id='hashTagInput' placeholder='Enter a topic tag'/>
          <button id='enterHashTags'> Enter tags </button>
          

          <button id='stopStream' style={{'display': 'none'}}> Stop Stream </button>
        </ToggleDisplay>

        <div id="videos-container"></div>
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return state;
}

export default connect(mapStatetoProps)(StreamPageComp);