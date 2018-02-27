import React, { Component } from 'react';
import { PersonImage } from './PersonImage';
import * as axios from 'axios';

export class PeopleHitsGridItem extends React.Component {
  constructor(props) {
    super(props);
    const person = Object.assign({}, props.result._source, props.highlight);
    this.state = {
      person,
      imageUrl: 'http://blog.teamtreehouse.com/wp-content/uploads/2015/05/loading.gif'
    }
    this.person = person;
  }

  componentDidMount() {
    this._randomImg(this.person.gender);
  }

  _formatCurrency(value) {
    return new Intl.NumberFormat().format(value);
  }

  _randomImg(gender) {
    let g = 'male';
    if (gender === "F") g = 'female';
    let self = this;
    axios.get('https://randomuser.me/api/?lego1&inc=picture&noinfo&results=1&gender=' + g).then(function(response) {
      self.setState({
        imageUrl: response.data.results[0].picture.large
      });
    }).catch(function(error){
      console.log(error);
    });
  }

  render() {
    const { bemBlocks } = this.props;
    return (
      <div className="mc-grid-hit-item">
        <PersonImage imageUrl={this.state.imageUrl} viewType="grid"></PersonImage>
        <div className="grid mc-person-quick-details">
          <h3 className="mc-person-name">{this.person.firstname} {this.person.lastname}</h3>
          <p className="grid mc-person-detail-text">Account Number: <strong>{this.person.account_number}</strong></p>
          <p className="grid mc-person-detail-text">Address: <strong>{this.person.address}, {this.person.city}, {this.person.state}</strong></p>
          <p className="grid mc-person-detail-text">Current balance: <strong>${this._formatCurrency(this.person.balance)}</strong></p>
        </div>
      </div>
    );
  }
}
