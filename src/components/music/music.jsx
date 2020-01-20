import React, { Component } from "react";
//import From from "./../news/newsform";
import JukeBox from "./musiccard";
import Container from "@material-ui/core/Container";

import "bootstrap/dist/css/bootstrap.min.css";

//const API_KEY = "c6a3515abca0409f82bef3ec4382dcaa";

// moviesapi key=b515ec6bc6b82b1eef7d5396167104a5

export default class Music extends Component {
  constructor() {
    super();
    this.state = {
      topcharts: "",
      musicjson: "",
      graded_data: []
    };
    this.getMusic();
  }

  getMusic = async () => {
    const topcharts = await fetch(
      `https://cors-anywhere.herokuapp.com/http://api.deezer.com/chart`
    );

    const chartsongs = await topcharts.json();
    console.log(chartsongs);

    this.setState({
      topcharts: chartsongs
    });
    var readings = [];
    console.log("trying to read" + this.state.topcharts.tracks);

    for (var i = 0; i < 10; i++) {
      var one_data = {
        title: this.state.topcharts.tracks.data[i].title,
        cover: this.state.topcharts.tracks.data[i].album.cover_medium,
        artist: this.state.topcharts.tracks.data[i].artist.name,
        audiolink: this.state.topcharts.tracks.data[i].preview
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
      <div style={{ display: "inline-block", margin: "30px" }}>
        {this.state.graded_data.map(songdetails => (
          <div style={{ display: "inline-block", margin: "30px" }}>
            <JukeBox song={songdetails} />
          </div>
        ))}
      </div>
    );
  }
}
