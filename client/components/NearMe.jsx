import React from 'react';
const NearMeStyle = {
  borderStyle: 'solid',
  borderWidth: '1px'
};

export default class NearMe extends React.Component {
  constructor() {
    super();
    this.state = {
      buisness_id:document.URL.split('/:')[1]
    };
  }

  componentDidMount(){
    
  }
  
  render() {
    return (
      <div style={NearMeStyle}>
        {this.state.buisness_id}
      </div>
    );
  }
}