import actions from '../redux/actions';
import NewsArticleEntry from './NewsArticleEntry';
import { connect } from 'react-redux';

class NewsArticles extends React.Component {
  constructor(props) {
    super(props);
  }

  queryDB() {
    const url = '/getArticles?topic=' + (this.props.topic || 'WORLD NEWS');
    return $.get(url);
  }

  componentWillMount() {
    $('body').css('background-image', 'none');
  //query database for topic and pull out the articles for that topic
    var componentContext = this;
    this.queryDB()
      .done(r => {
        componentContext.props.dispatch(actions.updateNewsArticles(r));
      })
      .fail(e => console.log('E: ', e));
  }

  render() {
   return (
      <div> 
        <div> 
     
          {
            this.props.articles.map( (article, idx) => {
              return <NewsArticleEntry key={idx} idx={idx} article={article}/>
            })
          }

        </div>
        
      </div>

    )
  }

};

function mapStatetoProps(state) {
  return state;
}

export default connect(mapStatetoProps)(NewsArticles);