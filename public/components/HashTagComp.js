
var HashTagComp = ({tag, removeTag}) => {
  return (
    <span id='hashtag' onClick={removeTag} tag={tag.hashtag}>
      <i> #{tag.hashtag} &nbsp; </i> |
    </span> 
  )
};

export default HashTagComp;
      