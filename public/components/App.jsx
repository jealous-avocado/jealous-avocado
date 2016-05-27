class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <div> HELLO THIS IS THE MAIN APP PAGE </div>
        <br></br>
        <form method='post' action='/signup'>
          <label> Sign Up : </label>
          <input placeholder='username'></input>
          <input type='submit'></input>
        </form>
      </div>
    );
  }

}

window.App = App;