import NearMeModalItem from './NearMeModalItem.jsx';

const NearMeModalContent = props => (
  <div className="nearMeModalContent">
    <div className="nearMeModalRow">
      <div className="nearMeModalHeader">
        <p>All {props.category} Nearby</p>
      </div>
      {props.nearby.map((restaurant, index) => (
        <NearMeModalItem host={props.host} restaurant={restaurant} key={index} />
        ))}
    </div>
  </div>
);

export default NearMeModalContent;
