import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextTruncate from "react-text-truncate";
import Rating from "react-rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";

const useStyles = makeStyles({
  card: {
    maxWidth: 300
  }
});

export default function ImgMediaCard(props) {
  const classes = useStyles();
  const poster = `https://image.tmdb.org/t/p/w500/${props.movie.cover}`;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={props.movie.title}
          height="240"
          image={poster}
          title={props.movie.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.movie.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <TextTruncate
              line={4}
              element="span"
              truncateText="…"
              text={props.movie.overview}
            />
          </Typography>
          <Rating
            stop={props.movie.vote_average / 2}
            emptySymbol={[
              "fa fa-star-o fa-2x low",
              "fa fa-star-o fa-2x low",
              "fa fa-star-o fa-2x medium",
              "fa fa-star-o fa-2x medium",
              "fa fa-star-o fa-2x high",
              "fa fa-star-o fa-2x high"
            ]}
            fullSymbol={[
              "fa fa-star fa-2x low",
              "fa fa-star fa-2x low",
              "fa fa-star fa-2x medium",
              "fa fa-star fa-2x medium",
              "fa fa-star fa-2x high",
              "fa fa-star fa-2x high"
            ]}
            readonly
          />
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
