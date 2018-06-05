import NearMeRatings from './NearMeRatings.jsx';

const NearMeModalItem = props => (
  <div className="nearMeModalItem">
    <div style={{ background: `url(https://s3-us-west-1.amazonaws.com/foodeephotos/${props.restaurant.business_id}.jpg)` }} className="nearMeModalItemContent">
      <div className="nearMeModalItemDescription">
        <a href={`http:${props.host}:3000/biz/${props.restaurant.business_id}`}>{props.restaurant.name}</a>
        <NearMeRatings rating={props.restaurant.stars} numberOfRatings={props.restaurant.review_count} />
      </div>
    </div>
  </div>
);

export default NearMeModalItem;
