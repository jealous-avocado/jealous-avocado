class PublicPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className="col-md-5"> Public Page </div>
          <div className="col-md-7"> Current Videos </div>
        </div>
      </div>
    );

  }
}

export default PublicPage;