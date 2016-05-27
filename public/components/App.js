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

  toggleForm() {
    this.setState({ formOpen : false });
  }

  setCurrentUser(currentuser) {
    this.setState({
      user: {
        currentuser: currentuser
      }
    });
  }

  render() {
    return (
      <div>
        <div> HELLO THIS IS THE MAIN APP PAGE </div>
        <br></br>
        <button onClick={this.loadSignInPage.bind(this)}> Sign in! </button>
        <ToggleDisplay show={this.state.formOpen}> 
          <Signin toggleForm = {this.toggleForm.bind(this)} setCurrentUser = {this.setCurrentUser.bind(this)} />
        </ToggleDisplay>
        <div> current user : {this.state.user.currentuser} </div>
      </div>
    );
  }

}

export default App;