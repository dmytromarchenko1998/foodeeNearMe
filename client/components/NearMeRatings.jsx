const NearMeRatings = (props) => {
  var rating = props.rating;
  var starPosition = -420;
  if (rating >= 1) {
    starPosition += ((rating * 2 * -14) + 14);
  }
  var percentage = props.rating/5 * 100;
  return (
    <span className="nearMeRatings"> 
      <span style={{'backgroundPositionY':starPosition + 'px'}} className="nearMeListStars"></span>
      <span className="nearMeListReviesDesc" >{props.numberOfRatings} reviews</span>
    </span>
  )
}

export default NearMeRatings;