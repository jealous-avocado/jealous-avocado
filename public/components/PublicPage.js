class PublicPage extends React.Component {
  constructor() {
    super();
    this.state = {
      videos: ['video1','video2','video3','video4','video5','video6'],
      articles: ['article1','article2','article3','article4','article5'],
      currentVideo: null
    }
  }
  updateVideo(video) {
    this.setState({currentVideo: video})
  }
  updateArticle(article) {
    this.setState({articles: articles})
  }
  render() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className="col-md-6"> Current Video 
            <iframe width="560" height="315" src="https://www.youtube.com/embed/Dd7FixvoKBw" frameborder="0" allowfullscreen></iframe>            <div id="articles"> Trending Articles
              {this.state.articles.map((article) => 
              <li> {article} </li>
              )}  
            </div>
          </div>
          <div className="col-md-6"> Trending Videos
            {this.state.video.map((video) => 
              <li> {video} </li>
            )}
           </div>
        </div>
      </div>
    );

  }
}

export default PublicPage;