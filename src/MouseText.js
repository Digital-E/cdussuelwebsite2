import React, { Component } from 'react';

const MouseText = (props) => {
  const x = props.info.x + 20;
  const y = props.info.y;
  return <div class={props.mouseIn ? "mouse-text" : "mouse-text hide-mouse-text"} style={{left: x, top: y}}>{props.info.text}</div>
}

export default MouseText;
