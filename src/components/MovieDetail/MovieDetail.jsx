import React, { Fragment, useEffect, useState } from "react";
import classes from "./MovieDetail.module.css";
import YouTube from "react-youtube";
import { API_KEY } from "../RequestApi";
import Modal from "../UI/Modal";

const MovieDetail = (props) => {
  const [trailer, setTrailer] = useState([]);

  const inForMovie = props.imgInFor;
  //sẽ gọi useEffect nhưng lúc này chưa Click  nên id= '', sau khi click thì id có giá trị sẽ chạy hàm useEffect sẽ cho ra api tương ứng với id của video với dependency: inForMovie là biến chứa iD của video được click
  useEffect(() => {
    const fetchApiTrailer = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${inForMovie.id}/videos?api_key=${API_KEY}`
      );
      const data = await response.json();

      setTrailer(data.results);
    };
    fetchApiTrailer().catch(console.err);
  }, [inForMovie]);

  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  // Lấy ra bộ phim phần tử đầu tiên  thỏa mãn điều kiện sau khi click
  const movieRender =
    trailer &&
    trailer.find((movie) =>
      movie.site === "YouTube" && movie.type === "Trailer"
        ? movie.type === "Trailer"
        : movie.type === "Teaser"
    );

  console.log(movieRender);

  return (
    <Modal onClose={props.onClose}>
      <Fragment>
        {inForMovie && movieRender ? (
          <div className={classes.trailer}>
            <div className={classes.content_left}>
              <p className={classes.title}>{inForMovie.title}</p>
              <hr />
              <p></p>
              <p>
                <span>Release Date: </span>
                {inForMovie.release_date}
              </p>
              <p>
                <span>Vote: </span>
                {inForMovie.vote_average} / 10
              </p>
              <p>{inForMovie.overview}</p>
            </div>
            <YouTube
              videoId={movieRender.key}
              id={movieRender.id}
              opts={opts}
              type={movieRender.type}
              site={movieRender.site}
            />
          </div>
        ) : (
          <div className={classes.trailer}>
            <div className={classes.content_left}>
              <p className={classes.title}>{inForMovie.title}</p>
              <hr />
              <p></p>
              <p>
                <span>Release Date: </span>
                {inForMovie.release_date}
              </p>
              <p>
                <span>Vote: </span>
                {inForMovie.vote_average} / 10
              </p>
              <p>{inForMovie.overview}</p>
              <p>Sever Error Trailer or Teaser</p>
            </div>
            <img
              src={`https://image.tmdb.org/t/p/w500${inForMovie.backdrop_path}`}
              alt="img_backdrop_path"
              style={{
                width: "100%",
              }}
            />
          </div>
        )}
      </Fragment>
    </Modal>
  );
};

export default MovieDetail;
