class NewsArticles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  queryDB() {
    const url = '/getArticles?topic=' + this.props.topic;
    return $.get(url);
  }

  componentWillMount() {
  //query database for topic and pull out the articles for that topic
  // console.log(this.props.topic, 'topic');
  console.log(this.props.params, ' | topic');
    this.queryDB()
      .done(r => {
        //populate the component div with the articles returned
        /*
        this.setState({
          articles: r
        });
        */
      })
      .fail(e => console.log('E: ', e));
  }

  render() {
   return (
      <div> 
        <div> Map over all data received from query and render the articles </div>
        <br></br>

        <div> 
        Articles Here
          {
            this.state.articles.map( article => {
              <NewsArticleEntry key={article.title} article = {article} />
            })
          }
        </div>
        
        <pre>{}</pre>
      </div>

    )
  }

};

export default NewsArticles;