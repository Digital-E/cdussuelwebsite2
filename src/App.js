import React, { Component } from "react";
import "./App.css";

import ReactGA from "react-ga";

//React Routers
import { Router, Route, Switch } from "react-router";

// Prismic JS
import Prismic from "prismic-javascript";
import { Link, RichText, Date } from "prismic-reactjs";

//Grid
import Grid from "./Grid.js";

//Filter
import Filter from "./Filter.js";

//About

import About from "./About.js";

//Title

import Title from "./Title.js";

//Parallax Provider

import { ParallaxProvider } from "react-scroll-parallax";

//Parallax

import { Parallax } from "react-scroll-parallax";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      doc: null,
      stacks: null,
      layout: null,
      list: null,
      loading: true,
      blur: false
    };
  }

  renderGrids = (i, index) => {
    return (
      <Grid
        key={index}
        info={i.info}
        layout={this.state.layout[index]}
        rowHeight={60}
        width={1200}
        imageList={i.image}
      />
    );
  };

  getUrls = i => {
    return i.data.body[0].value.map(i => ({
      url: i.image.url,
      orientation: i["image-caption"][0].text
    }));
  };

  getParams = i => {
    let parameters = i.data.body[0].value.map(i =>
      i.caption[0].text.split(",")
    );

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      return i.data.body[0].value.map((i, index) => ({
        i: parameters[index][0],
        x: 0,
        y: 0,
        w: parseInt(parameters[index][3]),
        h: parseInt(parameters[index][4]),
        isDraggable: false,
        isResizable: false
      }));
    } else {
      return i.data.body[0].value.map((i, index) => ({
        i: parameters[index][0],
        x: parseInt(parameters[index][1]),
        y: parseInt(parameters[index][2]),
        w: parseInt(parameters[index][3]),
        h: parseInt(parameters[index][4]),
        isDraggable: false,
        isResizable: false
      }));
    }
  };

  renderAll = () => {
    let stacks = this.state.doc.map((i, index) => ({
      tags: i.uid.split("-"),
      info: i.data.title[0].text,
      image: this.getUrls(i)
    }));

    this.setState({ stacks: stacks });

    let layout = this.state.doc.map((i, index) => this.getParams(i));

    this.setState({ layout: layout });

    let list = this.state.stacks.map((i, index) => this.renderGrids(i, index));

    this.setState({ list: list });
  };

  // Link Resolver
  linkResolver(doc) {
    // Define the url depending on the document type
    if (doc.type === "page") {
      return "/page/" + doc.uid;
    } else if (doc.type === "blog_post") {
      return "/blog/" + doc.uid;
    }

    // Default to homepage
    return "/";
  }

  componentDidMount() {
    const apiEndpoint = "https://caroline-dussuel.prismic.io/api/v2";

    Prismic.api(apiEndpoint).then(api => {
      api
        .query("", { orderings: "[document.first_publication_date desc]" })
        .then(response => {
          if (response) {
            this.setState({ doc: response.results });
          }

          this.renderAll();
        });
    });

    ReactGA.initialize("UA-134074544-1");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  handleClick = () => {
    this.setState({
      blur: !this.state.blur
    });
  };

  handleListClick = e => {
    const apiEndpoint = "https://caroline-dussuel.prismic.io/api/v2";

    //blur list item

    let filterList = e.target.parentNode.children;

    for (let i = 0; i < filterList.length; i++) {
      filterList[i].classList = "noBlurFilter";
    }

    e.target.className = "blurFilter";

    if (e.target.innerHTML == "Editorial") {
      e.target.className = "blurFilter";

      Prismic.api(apiEndpoint).then(api => {
        api
          .query(Prismic.Predicates.at("document.tags", ["editorial"]))
          .then(response => {
            if (response) {
              this.setState({ doc: response.results });
            }

            this.renderAll();
          });
      });
    } else if (e.target.innerHTML == "Fashiondesign") {
      e.target.className = "blurFilter";

      Prismic.api(apiEndpoint).then(api => {
        api
          .query(Prismic.Predicates.at("document.tags", ["fashiondesign"]))
          .then(response => {
            if (response) {
              this.setState({ doc: response.results });
            }

            this.renderAll();
          });
      });
    } else if (e.target.innerHTML == "Commercial") {
      Prismic.api(apiEndpoint).then(api => {
        api
          .query(Prismic.Predicates.at("document.tags", ["commercial"]))
          .then(response => {
            if (response) {
              this.setState({ doc: response.results });
            }

            this.renderAll();
          });
      });
    } else if (e.target.innerHTML == "Music Video") {
      Prismic.api(apiEndpoint).then(api => {
        api
          .query(Prismic.Predicates.at("document.tags", ["musicvideo"]))
          .then(response => {
            if (response) {
              this.setState({ doc: response.results });
            }

            this.renderAll();
          });
      });
    } else {
      Prismic.api(apiEndpoint).then(api => {
        api
          .query("", { orderings: "[document.last_publication_date desc]" })
          .then(response => {
            if (response) {
              this.setState({ doc: response.results });
            }

            this.renderAll();
          });
      });
    }
    setTimeout(function() {
      window.scrollTo(0, 0);
    }, 1000);
  };

  render() {
    return (
      <>
        <Title
          className={this.state.blur ? "title blurAll" : "title blurAllNone"}
        />
        <About className={this.state.blur} handleClick={this.handleClick} />
        <Filter
          className={this.state.blur ? "filter blurAll" : "filter blurAllNone"}
          handleListClick={this.handleListClick}
        />
        <div
          className={
            this.state.blur ? "wrapper blurAll" : "wrapper blurAllNone"
          }
        >
          {this.state.list}
        </div>
      </>
    );
  }
}

export default App;
