
class Profile extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    $('body').css('background-image', 'url(../css/cat.jpg)');
  }

  render() {

    return (
      <div className='container-fluid'>
        <div className='jumbotron'>
          <h1>FEATURES TO COME</h1>
          <h3>Please meet our company photographer while you wait</h3>
          <i><h5> She's been on vacation...it's been a catastrophe </h5></i>
        </div>
      </div>
    );

  }

}

export default Profile;