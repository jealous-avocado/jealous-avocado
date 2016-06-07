var Preview = (props) => {
  var connection = new RTCMultiConnection(props.broadcastID).connect();
  connection.body = $(previewContainer);
  console.log('connection', connection);
  connection.session = {
        video: true,
        screen: true,
        audio: true,
        oneway: true
    };
  props.socket.emit('join-broadcast', {
        broadcastid: props.broadcastID,
        userid: connection.userid,
        typeOfStreams: connection.session
    });
  return (
    <div></div>
  );
}

export default Preview;