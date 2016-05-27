
class Signin extends React.Component {
  constructor(props) {
    super(props);
  }

  escape(userInfo) {
    var escaped = {};

    for (var key in userInfo) {
      var value = userInfo[key];
      escaped[key] = typeof value === 'string' ? _.escape(value) : value;
    }

    return escaped;
  }

  postUser(e) {
    e.preventDefault();
    let username = $('#username').val(); // --> grabs username input
    let password = $('#password').val();

    var userObj = this.escape.apply(this, {username: username, password: password});

    $.post('/signin', userObj)
    .then( () => {
      this.props.toggleForm();
      this.props.setCurrentUser(username);
    })
    .catch( e => {

    });
  }

  render() {
    return (
      <form onSubmit={this.postUser.bind(this)}>
        <label> Sign Up : </label>
        <input id='username' placeholder='username'/>
        <input id='password' placeholder='password' type='password' />
        <input type='submit'></input>
      </form>
      <ToggleDisplay show='true'>
      </ToggleDisplay>
    );
  }
}

export default Signin;
