var NewsArticleEntry = ({article, idx}) => {
  return (
    <div>
      <div> {idx+1}. <a href={article}>{article}</a> </div>
    </div>
  );
};

export default NewsArticleEntry;