import React, { Component } from "react";

import info from "./info.svg";

import insta from "./insta-icon.png";

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div onClick={this.props.handleClick} class="about-button">
          <img src={info} />
        </div>
        <div
          class={
            this.props.className ? "about-text" : "about-text hidden-about-text"
          }
        ></div>
        <p
          class={
            this.props.className
              ? "about-inner-text"
              : "hidden-about-inner-text"
          }
        >
          Caroline Dussuel is a 23-year-old french creative whose main focus is
          on humans and their particularities. Her curiosity for sociology and
          psychology brought her to experience different urban and alternative
          communities, like skateboarding or rave parties, not as an active
          participant but as an outsider, through the lens of her camera.
          Naturally drawn towards the unexpected and creative people, she
          thrives off their energy. For many years she spent time capturing
          these people, either for herself or through commissioned work. After
          having studied fashion and design at ESMOD, she became very concerned
          about industry practices and their impact and started imagining how
          she could help contribute to a more sustainable future.
          <br />
          <br />
          If you would like to work with Caroline,{" "}
          <a id="email" href="mailto:carolinedussuel@gmail.com">
            contact her.
          </a>
          <br />
          <br />
          <a href="https://www.instagram.com/carokenzy/" target="_blank">
            <img id="insta-icon" src={insta}></img>
          </a>
          <div className="dev-link">
            design & code by{" "}
            <a href="http://www.samuelbassett.xyz/" target="_blank">
              samuel bassett
            </a>
          </div>
        </p>
      </>
    );
  }
}

export default About;
