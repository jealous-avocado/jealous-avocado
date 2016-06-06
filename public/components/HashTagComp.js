var HashTagComp = ({tag, removeTag}) => {
  return (
    <span id='hashtag' onClick={removeTag} tag={tag.hashtag}>
      <i> # 
        <span className='tagText'>
          {tag.hashtag}
        </span>  &nbsp;
      </i> |
    </span> 
  )
};

export default HashTagComp;