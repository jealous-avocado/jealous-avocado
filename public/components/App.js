import {Link} from 'react-router';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        currentUser: null
      }

    };
  }

  render() {




    return (
      <div>
        <Link to="/signin"> Sign in </Link>
        <br></br>

        {this.props.children}

        
        <pre> current user : {this.state.user.currentuser} </pre>
      </div>
    );
  }

}

export default App;