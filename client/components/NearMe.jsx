import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import NearMeModal from './NearMeModal.jsx';
import NearMeList from './NearMeList.jsx';

class NearMe extends React.Component {
  constructor() {
    super();
    this.state = {
      category: '',
      business_id: document.URL.split('/')[4],
      nearby: undefined,
      host: document.URL.split(':')[1],
    };
  }

  componentDidMount() {
    $.ajax({
      url: `http://localhost:3005/api/${this.state.business_id}`,
      method: 'GET',
      contentType: 'application/json',
      data: { ip: this.state.host },
      headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Methods': 'GET' },
      success: (data) => {
        var data = JSON.parse(data);
        this.setState({ nearby: data[1], category: data[0].categories[0] });
      },
    });
  }

  toggleModal() {
    const modal = document.getElementsByClassName('nearMeModalPage')[0];
    if (modal.style.display === 'flex') {
      modal.style.display = 'none';
    } else {
      modal.style.display = 'flex';
    }
  }

  render() {
    if (this.state.nearby) {
      return (
        <div className="nearMeContainer">
          <NearMeModal host={this.state.host} toggleModal={this.toggleModal} nearby={this.state.nearby} category={this.state.category} />
          <div className="nearMeheader">
            <p>Other {this.state.category} Nearby</p>
          </div>
          <div>
            <NearMeList host={this.state.host} nearby={this.state.nearby} />
          </div>
          <div className="nearMeFooter">
            <p onClick={this.toggleModal} >More {this.state.category} Nearby</p>
          </div>
        </div>
      );
    }
    return (<p />);
  }
}

ReactDOM.render(<NearMe />, document.getElementById('NearMe'));

export default NearMe;
