import React from 'react';
import ReactDOM from 'react-dom';

export default class NearMe extends React.Component {
  constructor() {
    super();
    this.state = {
      category:'',
      // business_id:"-BmqghX1sv7sgsxOIS2yAg",
      business_id:document.URL.split('/biz/')[1],
      nearby:undefined    
    };
  }

  componentDidMount(){
    $.ajax({
      url:'http://localhost:3005/api/:' + this.state.business_id,
      method: 'get',
      headers: {'Access-Control-Allow-Origin': '*'},
      success: (data) => {
        var data = JSON.parse(data);
        this.setState({nearby:data[1], category:data[0].categories[0]});
      }
    })
//     this.setState({nearby:[{"business_id": "-1m9o3vGRA8IBPNvNqKLmA", "name": "Bavette's Steakhouse & Bar", "neighborhood": "The Strip", "address": "3770 Las Vegas Blvd S", "city": "Las Vegas", "state": "NV", "postal_code": "89109", "latitude": 36.10433, "longitude": -115.175593333, "stars": 4.5, "review_count": 38, "is_open": 1, "attributes": {"Alcohol": "full_bar", "HasTV": false, "NoiseLevel": "average", "RestaurantsAttire": "dressy", "BusinessAcceptsCreditCards": true, "Music": {"dj": false, "background_music": true, "no_music": false, "karaoke": false, "live": true, "video": false, "jukebox": false}, "Ambience": {"romantic": false, "intimate": true, "classy": true, "hipster": false, "divey": false, "touristy": false, "trendy": false, "upscale": true, "casual": false}, "RestaurantsGoodForGroups": true, "WiFi": "free", "RestaurantsReservations": true, "RestaurantsTableService": true, "Smoking": "no", "GoodForKids": false, "HappyHour": false, "GoodForDancing": false, "BikeParking": true, "OutdoorSeating": false, "RestaurantsPriceRange2": 4, "RestaurantsDelivery": false, "GoodForMeal": {"dessert": false, "latenight": false, "lunch": false, "dinner": true, "breakfast": false, "brunch": false}, "BusinessParking": {"garage": false, "street": false, "validated": false, "lot": false, "valet": false}, "CoatCheck": false, "RestaurantsTakeOut": false}, "categories": ["African", "Restaurants", "Nightlife", "Bars", "Steakhouses", "Cocktail Bars", "American (New)", "Seafood"], "hours": {"Monday": "17:00-22:00", "Tuesday": "17:00-22:00", "Friday": "17:00-23:00", "Wednesday": "17:00-22:00", "Thursday": "17:00-22:00", "Sunday": "17:00-22:00", "Saturday": "17:00-23:00"}},
// {"business_id": "-1vfRrlnNnNJ5boOVghMPA", "name": "Red Ginseng Narita Sushi & BBQ", "neighborhood": "Centennial", "address": "6630 N Durango Dr, Ste 180", "city": "Las Vegas", "state": "NV", "postal_code": "89149", "latitude": 36.2812952069, "longitude": -115.286736503, "stars": 3.0, "review_count": 75, "is_open": 0, "attributes": {"RestaurantsTableService": true, "GoodForMeal": {"dessert": false, "latenight": false, "lunch": true, "dinner": true, "breakfast": false, "brunch": false}, "Alcohol": "beer_and_wine", "Caters": false, "HasTV": true, "RestaurantsGoodForGroups": true, "NoiseLevel": "average", "WiFi": "no", "RestaurantsAttire": "casual", "RestaurantsReservations": true, "OutdoorSeating": false, "BusinessAcceptsCreditCards": true, "RestaurantsPriceRange2": 2, "BikeParking": true, "RestaurantsDelivery": false, "Ambience": {"romantic": false, "intimate": false, "classy": false, "hipster": false, "divey": false, "touristy": false, "trendy": false, "upscale": false, "casual": true}, "RestaurantsTakeOut": true, "GoodForKids": true, "BusinessParking": {"garage": false, "street": false, "validated": false, "lot": false, "valet": false}}, "categories": ["Sushi Bars", "Korean", "Restaurants"], "hours": {"Monday": "11:00-0:00", "Tuesday": "11:00-0:00", "Friday": "11:00-0:00", "Wednesday": "11:00-0:00", "Thursday": "11:00-0:00", "Sunday": "11:00-22:00", "Saturday": "11:00-0:00"}},], category: "cheap"})
  }
  
  toggleModal(){
    var modal = document.getElementsByClassName('nearMeModalPage')[0];
    if (modal.style.display === 'flex') {
      modal.style.display = 'none';
    } else {
      modal.style.display = 'flex';
    }
  }

  render() {
    if (this.state.nearby) { 
      return (
        <div className='nearMeContainer'>
          <NearMeModal toggleModal={this.toggleModal} nearby={this.state.nearby} category={this.state.category} />
          <div className="nearMeheader">
            <p>Other {this.state.category} Nearby</p>
          </div>
          <div>
            <NearMeList nearby={this.state.nearby}/>
          </div>
          <div className="nearMeFooter">
            <p onClick={this.toggleModal} >More {this.state.category} Nearby</p>
          </div>
        </div>
      );
    } else {
      return (<p></p>)
    }
  }
}

const NearMeModal = (props) => {
  return (
    <div class="nearMeModalPage">
      <div class="nearMeModalContainer">
        <p onClick={props.toggleModal} class="closeNearMeModal"><p>Close</p><p id="xicon">  &times;</p></p>
        <NearMeModalContent category={props.category} nearby={props.nearby} />
      </div>
    </div>
  )
}

const NearMeModalContent = (props) => {
  return (
    <div class="nearMeModalContent">
      <div className="nearMeModalRow">
        <div className="nearMeModalHeader">
          <p>All {props.category} Nearby</p>
        </div>
        {props.nearby.map((restaurant, index) => (
          <NearMeModalItem restaurant={restaurant} key={index}/>
        ))}
      </div>
    </div>
  )
}  

const NearMeModalItem = (props) => {
  return (
  <div className="nearMeModalItem">
    <div style={{background: "url(https://s3-us-west-1.amazonaws.com/foodeephotos/" + props.restaurant.business_id + ".jpg)"}} className="nearMeModalItemContent">
      <div className="nearMeModalItemDescription">
        <a href={"http://localhost:3005/biz/" + props.restaurant.business_id}>{props.restaurant.name}</a>
        <NearMeRatings rating={props.restaurant.stars} numberOfRatings={props.restaurant.review_count} />
      </div>
    </div>
  </div>
  )
}

const NearMeList = (props) => ( 
  <ul className="nearMeList">
    {props.nearby.map((restaurant, index) => { 
      if (index < 3) {
        return (
          <NearMeListItem restaurant={restaurant} key={index}/>
        )
      }
    })}
  </ul>
); 

const NearMeListItem = (props) => (
  <li className="nearMeListItem">
    <div>
      <img className="nearMeListItemImg" src={"https://s3-us-west-1.amazonaws.com/foodeephotos/" + props.restaurant.business_id +".jpg"}/>
    </div>
    <div className="nearMeListItemDescription">
      <a href={"http://localhost:3005/biz/" + props.restaurant.business_id}>{props.restaurant.name}</a>
      <NearMeRatings rating={props.restaurant.stars} numberOfRatings={props.restaurant.review_count} />
    </div>
  </li>
);

const NearMeRatings = (props) => {
  var rating = props.rating;
  var starPosition = -420;
  if (rating >= 1) {
    starPosition += ((rating * 2 * -14) + 14);
  }
  var percentage = props.rating/5 * 100;
  return (
    <span className="nearMeRatings"> 
      <span style={{'background-position-y':starPosition + 'px'}} className="nearMeListStars"></span>
       {props.numberOfRatings} reviews
    </span>
  )
}
