import React, { Component } from 'react';
import GridLayout from 'react-grid-layout';

import LazyLoad from 'react-lazyload';

import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/react-resizable/css/styles.css';

import Fade from 'react-reveal/Fade';

import MouseText from './MouseText.js'

class Grid extends React.Component {
  constructor(props) {
  super(props);

  this.state = {
     active: false,
     numberOfImagesLoaded:[{loaded: "ok"}],
     loaded: false,
     info: {text: '', x: '', y: ''}
   };

  this.handleClick = this.handleClick.bind(this);
  this.handleMouseEnter = this.handleMouseEnter.bind(this);
  this.handleMouseLeave = this.handleMouseLeave.bind(this);

}

  handleClick = () => this.setState({ active: !this.state.active });

  handleMouseMove = (e) => {
    this.setState({
      info: {text: this.props.info, x: e.pageX, y: e.pageY}
    });
    console.log(this.state.info);
  }


  handleMouseEnter = (e) => {

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 return
}

   this.setState({mouseIn: true});


    if(e.currentTarget.classList[1] === 'portrait'){
      this.setState({originalTransform: e.currentTarget.style.transform});
      e.currentTarget.style.transform = `${e.currentTarget.style.transform} scale(2)`;
    } else {
      this.setState({originalTransform: e.currentTarget.style.transform});
      e.currentTarget.style.transform = `${e.currentTarget.style.transform} scale(2)`;
    }
  };

  handleMouseLeave = (e) => {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 return
}
  this.setState({mouseIn: false});
    e.currentTarget.style.transform = `${this.state.originalTransform}`;
  }

loadedIndividual() {
  return {
    loaded: "ok"
  };
}

  loadCount = () => {
    let countImagesToLoad = this.props.imageList.length;
    this.setState({countImagesToLoad: this.props.imageList.length });
    this.setState({numberOfImagesLoaded: [...this.state.numberOfImagesLoaded, this.loadedIndividual()]});
    if(this.state.countImagesToLoad == this.state.numberOfImagesLoaded.length)
    this.setState({
      loaded: true
    });
  }


  renderDiv = (i, index) => {
      return (
    <div onMouseMove={this.handleMouseMove} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}  key={ i.i } onClick={ this.handleClick } className={ this.state.active ? `${this.props.imageList[index].orientation} unstack` : `${this.props.imageList[index].orientation} stack` }>
      <img onLoad={this.loadCount} className="image" alt="" src={this.props.imageList[index].url}/>
    </div>
  )
 }


  render() {
      return (
        <>
        <MouseText mouseIn={this.state.mouseIn} info={this.state.info}/>
        <LazyLoad height={200}>
        <Fade duration={2000}>
        <GridLayout orientation={this.props.orientation} className={ this.state.loaded ? (this.state.active ? 'layout expanded show' : 'layout notexpanded show') : 'layout notexpanded hide' } layout={this.props.layout} cols={12} rowHeight={this.props.rowHeight} width={this.props.width}>
          {this.props.layout.map((i, index) => this.renderDiv(i, index))}
        </GridLayout>
        </Fade>
        </LazyLoad>
        </>
      )
  }
}

export default Grid;
