var NewsVideoEntry = (props) => {
  return (
    <li className="video" onClick={props.updateCurrentVideo}> 
      <div> INDEX: {props.idx} </div>
      <div className="videoWrapper">
        <iframe width="142" height="80" src={"http://localhost:3000/" + video} frameBorder="0" allowFullScreen></iframe>        
      </div>
      
      {video + " is reporting on " + props.user.stream.title}
    </li>
  );
};


export default NewsVideoEntry;