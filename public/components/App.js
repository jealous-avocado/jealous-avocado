import {Link} from 'react-router';
import { connect } from 'react-redux';
import ToggleDisplay from 'react-toggle-display';
import actions from '../redux/actions';

class App extends React.Component {
  constructor() {
    super();
  }

  signout() {
    window.location.replace('/'); //currently not working

    let username = this.props.user.username;
    this.props.dispatch(actions.logoutUser());
    delete window.localStorage.state;
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
                <a className="navbar-brand" href="#">GoRep</a>
              </div>

              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
                <ul className="nav navbar-nav">
                  <li><Link to="/public">Public</Link> </li>
                  <li><Link to="/news">News</Link> </li>
                  <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dropdown <span className="caret"></span></a>
                    <ul className="dropdown-menu" role="menu">
                      <li><a href="#">Action</a></li>
                      <li><a href="#">Another action</a></li>
                      <li><a href="#">Something else here</a></li>
                      <li className="divider"></li>
                      <li><a href="#">Separated link</a></li>
                      <li className="divider"></li>
                      <li><a href="#">One more separated link</a></li>
                    </ul>
                  </li>
                </ul>
                <form className="navbar-form navbar-left" role="search">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Search"/>
                  </div>
                  <button onClick={this.searchForArticles.bind(this)} type="submit" className="btn btn-default">Submit</button>
                </form>
                <ul className="nav navbar-nav navbar-right">
                  <ToggleDisplay show={!this.props.user.username}>
                    <li> <Link to="/signin"> Sign in </Link> </li>
                    <li> <Link to="/signup"> Sign up </Link> </li>
                  </ToggleDisplay>
                  <ToggleDisplay show={!!this.props.user.username}>
                    <li>
                      <a href={`/${this.props.user.username}`}>My Page</a>
                    </li>
                    <li> <a href='' onClick={this.signout.bind(this)}> Log Out [{this.props.user.username}]</a> </li>
                  </ToggleDisplay>
                </ul>
              </div>
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