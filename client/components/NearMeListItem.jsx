import NearMeRatings from './NearMeRatings.jsx';

const NearMeListItem = props => (
  <li className="nearMeListItem">
    <div>
      <img className="nearMeListItemImg" src={`https://s3-us-west-1.amazonaws.com/foodeephotos/${props.restaurant.business_id}.jpg`} />
    </div>
    <div className="nearMeListItemDescription">
      <a href={`http:${props.host}:3000/biz/${props.restaurant.business_id}`}>{props.restaurant.name}</a>
      <NearMeRatings rating={props.restaurant.stars} numberOfRatings={props.restaurant.review_count} />
    </div>
  </li>
);

export default NearMeListItem;
