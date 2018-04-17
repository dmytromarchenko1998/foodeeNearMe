import React from 'react';
import ReactDOM from 'react-dom';

export default class NearMe extends React.Component {
  constructor() {
    super();
    this.state = {
      category:'',
      business_id:document.URL.split('/biz/')[1],
      nearby:undefined    
    };
  }

  componentDidMount(){
    $.ajax({
      url:'/api/:' + this.state.business_id,
      method: 'get',
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
          <NearMeModal toggleModal={this.toggleModal} nearby={this.state.nearby} />
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
        <NearMeModalContent />
      </div>
    </div>
  )
}

const NearMeModalContent = (props) => {
  return (
    <div class="nearMeModalContent">
      <NearMeModalRow />
    </div>
  )
}

const NearMeModalRow = (props) => {
  return (

    <div className="nearMeModalRow">
      <div className="nearMeModalHeader">
        <p>All "category name here" Nearby</p>
      </div>
      <NearMeModalItem/>
      <NearMeModalItem/>
      <NearMeModalItem/>
      <NearMeModalItem/>
      <NearMeModalItem/>
      <NearMeModalItem/>
      <NearMeModalItem/>
      <NearMeModalItem/>
      <NearMeModalItem/>
      <NearMeModalItem/>
      <NearMeModalItem/>
      <NearMeModalItem/>
      <NearMeModalItem/>
      <NearMeModalItem/>
      <NearMeModalItem/>
    </div>
  )
}  

const NearMeModalItem = (props) => {
  return (
  <div className="nearMeModalItem">
    <div className="nearMeModalItemContent">
      <div className="nearMeModalItemDescription">
        <p>restaurant name here</p>
        <NearMeRatings rating={4} numberOfRatings={4} />
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
