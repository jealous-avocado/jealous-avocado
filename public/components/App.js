import Signin from './Signin';
import ToggleDisplay from 'react-toggle-display';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }

  loadSignInPage() {
    window.location.assign('#/signin');
    // $('#signinPage').toggle();
  }

  render() {
    return (
      <div>
        <div> HELLO THIS IS THE MAIN APP PAGE </div>
        <br></br>
        <button onClick={this.loadSignInPage.bind(this)}> Sign in! </button>
      </div>
    );
  }

}

export default App;