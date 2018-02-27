import React, { Component } from 'react';

export class PersonImage extends React.Component {
  render() {
    console.log(this.props.imageUrl);
    return (
      <div className={this.props.viewType === 'grid' ? 'mc-profile-circle grid' : 'mc-profile-circle'}>
        <img data-qa="poster" src={this.props.imageUrl} alt="Profile image" />
      </div>
    )
  }
}
