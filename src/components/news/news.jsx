import React, { Component } from "react";
//import From from "./../news/newsform";
import Cards from "./newscard";
import Container from "@material-ui/core/Container";

import "bootstrap/dist/css/bootstrap.min.css";

const API_KEY = "c6a3515abca0409f82bef3ec4382dcaa";

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      headlines: "",
      newsjson: "",
      graded_data: []
    };
    this.getNews();
  }

  getNews = async () => {
    const hlines = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    );
    const hlinesfeed = await hlines.json();
    console.log(hlinesfeed);

    this.setState({
      headlines: hlinesfeed
    });
    var readings = [];
    for (var i = 0; i < 20; i++) {
      var one_data = {
        source: hlinesfeed.articles[i].source.name,
        title: hlinesfeed.articles[i].title,
        author: hlinesfeed.articles[i].author,
        url: hlinesfeed.articles[i].url,
        description: hlinesfeed.articles[i].description,
        urlToImage: hlinesfeed.articles[i].urlToImage,
        date: hlinesfeed.articles[i].publishedAt,
        content: hlinesfeed.articles[i].content
      };

      readings.push(one_data);
    }
    this.setState({
      graded_data: readings
    });
    console.log("after grading in news " + this.state.graded_data[6]);
  };
  // const newsapi = await fetch(
  //   `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  // );
  // console.log(newsapi);

  render() {
    return (
      <Container maxWidth="sm">
        {this.state.graded_data.map(article => (
          <Cards article={article} />
        ))}
      </Container>
    );
  }
}
