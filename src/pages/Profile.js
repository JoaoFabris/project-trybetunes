import React, { Component } from 'react';
import Header from '../components/Header';

export default class Profile extends Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-profile"> </div>
      </>
    );
  }
}
