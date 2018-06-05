import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class NearMe extends React.Component {
  constructor() {
    super();
    this.state = {
      category:'',
      business_id:document.URL.split('/')[4],
      nearby:undefined,
      host:document.URL.split(':')[1]   
    };
  }

  componentDidMount(){
    $.ajax({
      url:'http://localhost:3005/api/' + this.state.business_id,
      method: 'GET',
      contentType: "application/json",
      data: {ip:this.state.host},
      headers: {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Methods': 'GET'},
      success: (data) => {
        var data = JSON.parse(data);
        this.setState({nearby:data[1], category:data[0].categories[0]});
      }
    })
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
          <NearMeModal host={this.state.host} toggleModal={this.toggleModal} nearby={this.state.nearby} category={this.state.category} />
          <div className="nearMeheader">
            <p>Other {this.state.category} Nearby</p>
          </div>
          <div>
            <NearMeList host={this.state.host} nearby={this.state.nearby}/>
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
    <div className="nearMeModalPage">
      <div className="nearMeModalContainer">
        <span onClick={props.toggleModal} className="closeNearMeModal"><p>Close</p><p id="xicon">  &times;</p></span>
        <NearMeModalContent host={props.host} category={props.category} nearby={props.nearby} />
      </div>
    </div>
  )
}

const NearMeModalContent = (props) => {
  return (
    <div className="nearMeModalContent">
      <div className="nearMeModalRow">
        <div className="nearMeModalHeader">
          <p>All {props.category} Nearby</p>
        </div>
        {props.nearby.map((restaurant, index) => (
          <NearMeModalItem host={props.host} restaurant={restaurant} key={index}/>
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
        <a href={"http:" + props.host + ":3000/biz/" + props.restaurant.business_id}>{props.restaurant.name}</a>
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
          <NearMeListItem host={props.host} restaurant={restaurant} key={index}/>
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
      <a href={"http:" + props.host + ":3000/biz/" + props.restaurant.business_id}>{props.restaurant.name}</a>
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
      <span style={{'backgroundPositionY':starPosition + 'px'}} className="nearMeListStars"></span>
      <span className="nearMeListReviesDesc" >{props.numberOfRatings} reviews</span>
    </span>
  )
}

ReactDOM.render(<NearMe />, document.getElementById('NearMe'));

export default NearMe;
