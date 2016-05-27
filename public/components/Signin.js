class Signin extends React.Component {
  constructor(props) {
    super(props);
  }

  postUser(e) {
    e.preventDefault();
    let username = $('#username').val(); // --> grabs username input
    let password = $('#password').val();

    $.post('/signin', {username : username, password: password})
    .then( () => {
      // this.setState({ currentUser: username });
      window.location.assign('#/'+ username);
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
    );
  }
}

export default Signin;
