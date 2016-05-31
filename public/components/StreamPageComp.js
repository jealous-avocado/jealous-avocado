import {socketsTest} from '../socketioRTC';

class StreamPageComp extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    socketsTest();
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


export default StreamPageComp;