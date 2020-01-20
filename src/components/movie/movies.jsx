import React, { Component } from "react";
//import From from "./../news/newsform";
import ImgMediaCard from "./moviecard";
import Container from "@material-ui/core/Container";

import "bootstrap/dist/css/bootstrap.min.css";

// const API_KEY = "c6a3515abca0409f82bef3ec4382dcaa";

const API_KEY = "b515ec6bc6b82b1eef7d5396167104a5";

export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      trendingmovies: "",
      moviejson: "",
      graded_data: []
    };
    this.getMovies();
  }

  getMovies = async () => {
    const topmovies = await fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
    );

    const topmoviesapi = await topmovies.json();
    console.log(topmoviesapi);

    this.setState({
      trendingmovies: topmoviesapi
    });
    var readings = [];
    console.log("trying to read" + this.state.trendingmovies);

    for (var i = 0; i < 20; i++) {
      const var_title = "";
      if (this.state.trendingmovies.results[i].title === undefined) {
        var_title = this.state.trendingmovies.results[i].name;
      } else {
        var_title = this.state.trendingmovies.results[i].title;
      }

      var one_data = {
        title: var_title,
        cover: this.state.trendingmovies.results[i].poster_path,
        vote_average: this.state.trendingmovies.results[i].vote_average,
        overview: this.state.trendingmovies.results[i].overview

        // title: this.state.topcharts.tracks.data[i].title,
        // cover: this.state.topcharts.tracks.data[i].album.cover_medium,
        // artist: this.state.topcharts.tracks.data[i].artist.name,
        // audiolink: this.state.topcharts.tracks.data[i].preview
      };

      readings.push(one_data);
    }
    this.setState({
      graded_data: readings
    });
    console.log("after grading in music " + this.state.graded_data);
  };
  // const newsapi = await fetch(
  //   `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  // );
  // console.log(newsapi);

  render() {
    return (
      <div style={{ display: "inline-block", margin: "60px" }}>
        {this.state.graded_data.map(moviedetails => (
          <div style={{ display: "inline-block", margin: "70px" }}>
            <ImgMediaCard movie={moviedetails} />
          </div>
        ))}
      </div>
    );
  }
}
