import { Link } from 'react-router';


class LandingPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div id='landing'>
        <Link to='/public'> <h1>ENTER</h1></Link>
      </div>
    );
  }

}

export default LandingPage;