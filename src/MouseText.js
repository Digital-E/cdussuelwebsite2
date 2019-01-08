import React, { Component } from 'react';

const MouseText = (props) => {
  let is_chrome = /chrome/i.test( navigator.userAgent );
  let x;
  let y;
  if (is_chrome) {
    x = props.info.x - 130;
    y = props.info.y - 230;
  } else {
    x = props.info.x + 20;
    y = props.info.y;
  }
  return <div class={props.mouseIn ? "mouse-text" : "mouse-text hide-mouse-text"} style={{left: x, top: y}}>{props.info.text}</div>
}

export default MouseText;
