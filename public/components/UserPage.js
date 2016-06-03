class UserPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // sockets();
  }

  render() {
    return (
      <div>
        <div>Signed in, {this.props.currentuser}</div>
        <button id='startStream'> Start Stream </button>
        <div id="videos-container"></div>
      </div>
    )
  }
}

export default UserPage;