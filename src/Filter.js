import React, { Component } from 'react';

// Prismic JS
import Prismic from 'prismic-javascript';
import {Link, RichText, Date} from 'prismic-reactjs';

class Filter extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {

    let filterItems = ['All','Photography','Fashiondesign','Styling'];

    const listItems = filterItems.map((i) => <div key={i} onClick={this.props.handleListClick}>{i}</div>);

    return(
      <div class={this.props.className}>{listItems}</div>
    )
  }
}

export default Filter;
