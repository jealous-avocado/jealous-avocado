import { Link } from 'react-router';


class LandingPage extends React.Component {
  constructor() {
    super();
  }


  render() {
    return (
      <div id='landing'>
        <div id='landingContainer'>
          <Link to='/public'> Enter </Link>
        </div>
      </div>
    );
  }

}

export default LandingPage;