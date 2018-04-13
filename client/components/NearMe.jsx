import React from 'react';
// import $ from 'jquery';
import ReactDOM from 'react-dom';

const NearMeStyle = {
  borderStyle: 'solid',
  borderWidth: '1px',
  'font-family': 'Ariel'
};

export default class NearMe extends React.Component {
  constructor() {
    super();
    this.state = {
      category:'',
      buisness_id:document.URL.split('/:')[1],
      nearby:[{},{},{}]
    };
  }

  componentDidMount(){
    $.ajax({
      url:'/api/:' + this.state.buisness_id,
      method: 'get',
      success: (data) => {
        var data = JSON.parse(data);
        this.setState({nearby:data[1], category:data[0].categories[0]});
      }
    })
  }
  
  render() {
    return (
      <div style={NearMeStyle}>
        <div class="nearMeheader">
          <p>Other {this.state.category} Nearby</p>
        </div>
        <div>
          <NearMeList nearby={this.state.nearby}/>
        </div>
      </div>
    );
  }
}

const NearMeList = (props) => (
  <ul>
    {props.nearby.map((restaurant, index) => (
      <NearMeListItem restaurant={restaurant} key={index}/>
    ))}
  </ul>
); 

const NearMeListItem = (props) => (
  <li>
    <div>
      <p>{props.restaurant.name}</p>
    </div>
  </li>
);