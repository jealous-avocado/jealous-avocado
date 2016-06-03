import {Link} from 'react-router';
import { connect } from 'react-redux';
import ToggleDisplay from 'react-toggle-display';
import actions from '../redux/actions';

class App extends React.Component {
  constructor() {
    super();
  }

  signout() {
    
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