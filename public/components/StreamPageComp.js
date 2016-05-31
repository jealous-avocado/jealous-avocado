class StreamPageComp extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    var connection = new RTCMultiConnection().connect();
    
    document.querySelector('#startStream').onclick = function() {

        connection.open();
        connection.direction = 'one-way';
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


export default StreamPageComp;