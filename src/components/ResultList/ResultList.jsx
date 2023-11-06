import React, { Fragment, useState } from "react";
import classes from "./ResultList.module.css";
import MovieDetail from "../MovieDetail/MovieDetail";
const ResultList = (props) => {
  const [imgInFor, setImgInFor] = useState("");
  const [showMovie, setShowMovie] = useState(false);

  const hideDetailMovieHandler = () => {
    setShowMovie(false);
  };

  const showDetailMovieHandler = () => {
    setShowMovie(true);
  };

  return (
    <Fragment>
      <div className={classes.container}>
        <h1>Search Result</h1>

        <div className={classes.movie_list}>
          {/* kiểm tra xem có dữ liệu hay không có thì hiển thị ra giao diện */}
          {props.resultMovies &&
            props.resultMovies.map((movie, index) => (
              <section key={movie.id}>
                {/* kiểm tra movies các img movies hợp lệ không thì mới được chọn để render ra giao diện */}
                {movie.poster_path && (
                  <img
                    className={classes.movieImg}
                    key={movie.id}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
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
      </div>
      {showMovie && (
        <MovieDetail imgInFor={imgInFor} onClose={hideDetailMovieHandler} />
      )}
    </Fragment>
  );
};

export default ResultList;
