import React, { Component } from 'react';
import { PersonImage } from './PersonImage';
import * as axios from 'axios';

export class PeopleHitsListItem extends React.Component {
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
      <div className="mc-list-hit-item">
        <div className="mc-person-top-info">
          <div className="mc-person-top-details">
            <PersonImage imageUrl={this.state.imageUrl}></PersonImage>
            <dl className="mc-person-info">
              <dt>Account Holder</dt>
              <dd>{this.person.firstname} {this.person.lastname}</dd>
            </dl>
            <dl className="mc-person-info">
              <dt>Account Number</dt>
              <dd>{this.person.account_number}</dd>
            </dl>
            <dl className="mc-person-info">
              <dt>Available balance</dt>
              <dd>${this._formatCurrency(this.person.balance)}</dd>
            </dl>
          </div>
          <div className="mc-person-actions actions-button-bar">
            <button className="mc-default-button">Statements</button>
            <button className="mc-default-button">History</button>
          </div>
        </div>
        <div className="mc-person-quick-details">
          <dl className="mc-person-info horizontal">
            <dt>Address:</dt>
            <dd>{this.person.address}, {this.person.city}, {this.person.state}</dd>
          </dl>
          <dl className="mc-person-info horizontal">
            <dt>Phone:</dt>
            <dd>205-999-9999</dd>
          </dl>
        </div>
        <div className="mc-person-quick-details">
          <dl className="mc-person-info horizontal">
            <dt>Email:</dt>
            <dd>{this.person.email}</dd>
          </dl>
          <dl className="mc-person-info horizontal">
            <dt>Employer:</dt>
            <dd>{this.person.employer}</dd>
          </dl>
        </div>
      </div>
    );
  }
}
