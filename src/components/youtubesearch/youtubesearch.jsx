import React, { Component } from "react";
//import From from "./../news/newsform";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import YouTube from "react-youtube";

import "bootstrap/dist/css/bootstrap.min.css";

// const API_KEY = "c6a3515abca0409f82bef3ec4382dcaa";

const API_KEY = "AIzaSyBJOgy2zUGv2E9tSP4boXijK4YB-g125J4";
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2)
    }
  }
}));
function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress color="secondary" size="12rem" />
    </div>
  );
}

export default class Youtubedum extends Component {
  constructor() {
    super();

    this.state = {
      isloading: true,
      trendingvideos: "",
      vidoesjson: "",
      graded_data: []
    };
    this.getVideos();
  }

  getVideos = async () => {
    const topvideos = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&chart=mostPopular&regionCode=US&maxResults=20&key=${API_KEY}`
    );

    const topvideosapi = await topvideos.json();
    console.log(topvideosapi);

    this.setState({
      trendingvideos: topvideosapi
    });
    var readings = [];
    console.log("trying to read" + this.state.trendingvideos);

    for (var i = 0; i < 20; i++) {
      var one_data = {
        id: this.state.trendingvideos.items[i].id
        // title: var_title,
        // cover: this.state.trendingmovies.results[i].poster_path,
        // vote_average: this.state.trendingmovies.results[i].vote_average,
        // overview: this.state.trendingmovies.results[i].overview
        // title: this.state.topcharts.tracks.data[i].title,
        // cover: this.state.topcharts.tracks.data[i].album.cover_medium,
        // artist: this.state.topcharts.tracks.data[i].artist.name,
        // audiolink: this.state.topcharts.tracks.data[i].preview
      };

      readings.push(one_data);
    }
    this.setState({
      graded_data: readings,
      isloading: false
    });
    console.log("after grading in youtube " + this.state.graded_data);
  };
  // const newsapi = await fetch(
  //   `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  // );
  // console.log(newsapi);

  render() {
    const opts = {
      height: "390",
      width: "640",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };

    return this.state.isloading ? (
      <div style={{ margin: "auto", width: "50%", height: "50%" }}>
        <CircularIndeterminate />
      </div>
    ) : (
      <div style={{ display: "inline-block", margin: "60px" }}>
        {this.state.graded_data.map(videodetails => (
          <div>
            {console.log("video ids" + videodetails.id)}
            <YouTube
              videoId={videodetails.id}
              opts={opts}
              onReady={this._onReady}
            />
          </div>
        ))}
      </div>
    );
  }
}
