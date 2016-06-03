import { connect } from 'react-redux';
import actions from '../redux/actions';

class StreamPageComp extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    var connection = new RTCMultiConnection().connect();
    var componentContext = this;
    document.querySelector('#startStream').onclick = function() {
        connection.open();
        connection.direction = 'one-way';
        componentContext.props.dispatch(actions.updateCurrentStreamers(componentContext.props.user.username));
        window.localStorage.setItem('state', JSON.stringify(this.props));
    };
  }

  render() {
    return (
      <div>
        <div>User Page </div>
        <button id='startStream'> Start Stream </button>
        <div id="videos-container"></div>
      </div>
    )
  }
}
function mapStatetoProps(state) {
  return state;
}

export default connect(mapStatetoProps)(StreamPageComp);
