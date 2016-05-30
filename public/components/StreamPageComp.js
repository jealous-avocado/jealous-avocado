class StreamPageComp extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // sockets();
  }

  render() {
    return (
      <div>
        <div>Signed innnn!!!, {this.props.currentuser}</div>
        <button id='startStream'> Start Stream </button>
        <div id="videos-container"></div>
      </div>
    )
  }
}

export default StreamPageComp;