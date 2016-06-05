import { connect } from 'react-redux';
import actions from '../redux/actions';

class PublicPage extends React.Component {
  constructor(props) {
    super(props);
  
  }
  updateCurrentVideo(event) {
    var src = $(event.currentTarget).find('iframe').attr('src');
    $('#currentVideo').attr('src', src);
  }
  updateArticle(article) {
    this.setState({articles: articles})
  }
  
  componentDidMount () {
    $('iframe').on('load', function () {
      $("iframe").contents().find('#app').hide()
    });
  }

  componentDidUpdate () {
   console.log('this.props.currentStreamers', this.props.currentStreamers);

  }

  render() {
    return (
      <div>
        <div className='row'>
          <div className="col-md-8"> <h2>Current Video</h2> 
            <iframe id="currentVideo" width="711" height="400" src="" frameBorder="0" allowFullScreen></iframe>            
              <div id="articles"> <h2>Trending Articles</h2>
                {this.state.articles.map((article) => 
                  <li> {article} </li>
                )}  
              </div>
          </div>
          
          <div className="col-md-4"> <h2 id='broadcast'>Currently Broadcasting</h2>
            <ul id='video'>
              {this.props.currentStreamers.map((video) => 
                  <li className="video" onClick={this.updateCurrentVideo}> 
                <div className="videoWrapper">
                    <iframe width="142" height="80" src={"http://localhost:3000/" + video} frameBorder="0" allowFullScreen></iframe>        
                </div>
                  {video + " is reporting on " + this.props.user.stream.title}
                  </li>
              )}
            </ul>
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