class NewsVideos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: []
    }
  }

  queryDB() {
    const url = '/getVideos?topic=' + this.props.topic;
    return $.get(url);
  }

  componentWillMount() {
    this.queryDB()
      .done(r => {
        /*
        thissetState({
          videos: r
        });
        */
      })
      .fail(e => console.log('E: ', e));
  }

  render() {
    return (
      <div>
        <div> Map over videos gotten from DB and show them here </div>
        <br></br>

        <div> 
        Temporary News Videos Area 
        {
          this.state.videos.map(video => {
            <NewsVideoEntry key = {video.title} video = {video} />
          })
        }
        </div>
      </div>
    )
  }
  
};

export default NewsVideos;