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

    // console.log('route props: ', this.props);

    let username = $('#username').val(); // --> grabs username input
    let password = $('#password').val();

    var userObj = this.escape.call(this, {username: username, password: password});


    $.post('/signin', userObj)
    .done(() => {
      this.props.dispatch(actions.signinUser(username));

      window.localStorage.setItem('state', JSON.stringify(this.props));

      $('#signinForm').hide();
      
    });
    // .fail(e => console.log(e, 'error'));
    // on fail --> present user with failed auth message

  }

  render() {
    return (
      <div>
        <form id="signinForm" onSubmit={this.postUser.bind(this)}>
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
