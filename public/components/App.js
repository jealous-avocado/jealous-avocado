import {Link} from 'react-router';
import { connect } from 'react-redux';

class App extends React.Component {
  constructor() {
    super();
    // this.state = {
    //   user: {
    //     currentUser: null
    //   }

    // };
  }


  render() {

    return (
      <div>
        <Link to="/signin"> Sign in </Link>
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