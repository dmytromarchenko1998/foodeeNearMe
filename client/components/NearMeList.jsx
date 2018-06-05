import NearMeListItem from './NearMeListItem.jsx';

const NearMeList = props => (
  <ul className="nearMeList">
    {props.nearby.map((restaurant, index) => {
      if (index < 3) {
        return (
          <NearMeListItem host={props.host} restaurant={restaurant} key={index} />
        );
      }
    })}
  </ul>
);

export default NearMeList;
