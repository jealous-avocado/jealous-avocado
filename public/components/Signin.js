import { connect } from 'react-redux';
import actions from '../redux/actions';

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

    this.props.dispatch(actions.updateUser(username));

    $.post('/signin', userObj)
    .done(() => {
      // window.location = '/'+;
      // return to home page view with homepage rendering components that are visible for signed in user

    });
    // .fail(e => console.log(e, 'error'));
    // on fail --> present user with failed auth message

  }

  render() {
    return (
      <div>
        <form onSubmit={this.postUser.bind(this)}>
          <input id='username' placeholder='username'/>
          <input id='password' placeholder='password' type='password' />
          <input type='submit'></input>
        </form> 
      </div>
    );
  }
}

function mapStatetoProps(state) {
  return state;
}

export default connect(mapStatetoProps)(Signin);
