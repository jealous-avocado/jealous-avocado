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

        <ToggleDisplay show={!this.state.user.currentuser}>
          <button onClick={this.loadSignInPage.bind(this)}> Sign in! </button>
        </ToggleDisplay>

        <ToggleDisplay show={this.state.formOpen}> 
          <Signin toggleForm = {this.toggleForm.bind(this)} setCurrentUser = {this.setCurrentUser.bind(this)} />
        </ToggleDisplay>


        <pre> current user : {this.state.user.currentuser} </pre>
      </div>
    );
  }

}

export default App;