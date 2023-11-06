import React, { useState } from "react";
import classes from "./MovieList.module.css";
import MovieDetail from "../MovieDetail/MovieDetail";

const MovieList = (props) => {
  //biến chứa dữ liệu ảnh khi được click
  const [imgInFor, setImgInFor] = useState("");

  const [showMovie, setShowMovie] = useState(false);

  //Ẩn Movie
  const hideDetailMovieHandler = () => {
    setShowMovie(false);
  };

  //Hiện Movie
  const showDetailMovieHandler = () => {
    setShowMovie(true);
  };

  return (
    <div className={classes.container}>
      <section className={classes.content}>
        <div className={classes.item}>
          {/* kiểm tra xem có dữ liệu hay không có thì hiển thị ra giao diện */}
          {props.movies &&
            props.movies.map((movie, index) => (
              <section key={index}>
                {/* kiểm tra movies các img movies hợp lệ không thì mới được chọn để render ra giao diện */}
                {movie.backdrop_path && (
                  <img
                    className={classes.movieImg}
                    key={movie.id}
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    alt="imgFilms"
                    onClick={() => {
                      setImgInFor(movie);
                      showDetailMovieHandler();
                    }}
                  />
                )}
              </section>
            ))}
        </div>
      </section>
      {showMovie && (
        <MovieDetail imgInFor={imgInFor} onClose={hideDetailMovieHandler} />
      )}
    </div>
  );
};

export default MovieList;
