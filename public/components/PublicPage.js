import { connect } from 'react-redux';
import actions from '../redux/actions';

class PublicPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: ["Nam", "John", "Prateek"],
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

  genFrame(w, h, streamName) {
    var port = 3000;
    var url = "http://localhost:" + port + "/" + streamName;
    var frame    = document.createElement('iframe');
    frame.src    = url;
    frame.width  = w;
    frame.height = h;
    frame.setAttribute("frameborder", 0);
    document.getElementById('video').appendChild(frame);
  }

  render() {
    console.log('this.props.currentStreamers is', this.props.currentStreamers);
    console.log(this.genFrame);
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className="col-md-4"> Current Video 
            <iframe width="560" height="315" src="http://localhost:3000/Nam" frameborder="0" allowfullscreen></iframe>            
            <div id="articles"> Trending Articles
              {this.state.articles.map((article) => 
              <li> {article} </li>
              )}  
            </div>
          </div>
          <div className="col-md-4"> 
          
          </div>

           <div className="col-md-4 trending"> Trending Videos
            {this.props.currentStreamers.map((video) => 
              <li id="video"> {this.genFrame(200,90,video)} </li>
            )}
           </div>
        </div>
      </div>
    );

  }
}


function mapStatetoProps(state) {
  return state;
}

export default connect(mapStatetoProps)(PublicPage);