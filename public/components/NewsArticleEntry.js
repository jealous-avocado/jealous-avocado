var alchemy = require('../../alchemy.config.js');

var NewsArticleEntry = ({article, idx}) => {

  // request.get(alchemy.getTextURL(article))
  //   .then()
  //   .catch();

  return (
    <div id='articleContainer'>
      <div> {idx+1}. <a href={article.url}>{article.url}</a> </div>
      <div><i>{article.snippet}</i></div>
    </div>
  );
};

export default NewsArticleEntry;