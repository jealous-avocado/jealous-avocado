import {Link} from 'react-router';
import { connect } from 'react-redux';
import ToggleDisplay from 'react-toggle-display';
import actions from '../redux/actions';

class App extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log('current user: ', this.props.user.username);
  }

  componentDidUpdate() {
    if (this.props.user.username) {
      console.log('user signed in : ', this.props.user.username);
    } else {
      console.log('user not signed in');
    }
    
    console.log('current user: ', this.props.user.username);

  }

  signout() {
    // delete window.localStorage.state;
    //dispatch logout user action
    let username = this.props.user.username;
    this.props.dispatch(actions.logoutUser());
    delete window.localStorage.state;
  }

  render() {

    return (
      <div>
        <ToggleDisplay show={!this.props.user.username}>
          <Link to="/signin"> Sign in </Link>
        </ToggleDisplay>

        <Link to="/news"> NEWS </Link>

        <ToggleDisplay show={!!this.props.user.username}>
          <button onClick={this.signout.bind(this)}> Log Out </button>
        </ToggleDisplay>
        
        <br></br>


        {this.props.children}

        <pre> currentUser: { this.props.user.username || 'none'} </pre>
      </div>
    );
  }

}

function mapStatetoProps(state) {
  return state;
}

export default connect(mapStatetoProps)(App);