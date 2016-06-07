import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import ToggleDisplay from 'react-toggle-display';
import actions from '../redux/actions';
import Signin from './Signin';
import Signup from './Signup';

class App extends React.Component {
  constructor() {
    super();
  }

  signout() {
    let username = this.props.user.username;
    this.props.dispatch(actions.logoutUser());
    delete window.localStorage.state;
    browserHistory.push('/');
  }

  searchForArticles(event) {
    /*
    ideally this will search for current streams, articles, and user profiles based off of the input; but unfortunately we couldn't get to it. I hope you, the next developer, will carry on the legacy. - GoRep
    */
  }

  render() {

    return (
      <div>

        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a href='/' className="navbar-brand">GoRep</a>
              </div>

              <ToggleDisplay show={window.location.pathname !== '/'}>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
                  <ul className="nav navbar-nav">
                    <li><Link to="/public">Home</Link> </li>
                    <li><Link to="/news">News</Link> </li>
                  </ul>
                  <form className="navbar-form navbar-left" role="search">
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Search"/>
                    </div>
                    <input onClick={this.searchForArticles.bind(this)} type="submit" className="btn btn-default"/>
                  </form>
                  <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"> Profile <span className="caret"></span></a>
                      <ul className="dropdown-menu" role="menu">
                        <ToggleDisplay show={!this.props.user.username}>
                          <li> <Link to='/signin'> Sign in </Link> </li>
                          <li> <Link to='/signup'> Sign up </Link> </li>
                        </ToggleDisplay>
                        <ToggleDisplay show={!!this.props.user.username}>
                          <li>
                            <a href={`/${this.props.user.username}`}>My Page</a>
                          </li>
                          <li> <a href='' onClick={this.signout.bind(this)}> Log Out [{this.props.user.username}]</a> </li>
                          <li>
                            <Link to={`/${this.props.user.username}/profile`}>Settings</Link>
                          </li>
                        </ToggleDisplay>
                      </ul>
                    </li>
                  </ul>
                </div>
              </ToggleDisplay>
            </div>
          </nav>

        <br></br>

        {this.props.children}

      </div>
    );
  }

}


function mapStatetoProps(state) {
  return state;
}

export default connect(mapStatetoProps)(App);