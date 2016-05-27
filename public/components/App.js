import Signin from './Signin';
import ToggleDisplay from 'react-toggle-display';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        currentUser: null
      },
      formOpen: false

    };
  }

  loadSignInPage() {
    // window.location.assign('#/signin');
    this.setState({ formOpen : true });
  }

  formViewHandler() {
    this.setState({ formOpen : false });
  }


  render() {
    return (
      <div>
        <div> HELLO THIS IS THE MAIN APP PAGE </div>
        <br></br>
        <button onClick={this.loadSignInPage.bind(this)}> Sign in! </button>
        <ToggleDisplay show={this.state.formOpen}> 
          <Signin formViewHandler = {this.formViewHandler.bind(this)} />
        </ToggleDisplay>
      </div>
    );
  }

}

export default App;