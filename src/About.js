import React, { Component } from 'react';

import info from './info.svg';

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {


    return(
      <>
      <div onClick={this.props.handleClick} class="about-button"><img src={info}/></div>
      <div class={this.props.className ? 'about-text' : 'about-text hidden-about-text'}>
      </div>
      <p class={this.props.className ? 'about-inner-text' : 'hidden-about-inner-text'}>
      Either through Photography, Fashion Design, or Art Direction, Caroline Dussuel
      constantly seeks to channel her ethically-oriented vision and environmentally conscious mind through her work for an ever more
      sustainable future.<br/>
      </p>
      </>
    )
  }
}

export default About;
