var alchemy = require('../../alchemy.config.js');

var NewsArticleEntry = ({article, idx}) => {

  // request.get(alchemy.getTextURL(article))
  //   .then()
  //   .catch();

  return (
    <div>
      <div> {idx+1}. <a href={article}>{article}</a> </div>
    </div>
  );
};

export default NewsArticleEntry;