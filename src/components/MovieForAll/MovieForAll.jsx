import React, { useEffect, useState } from "react";

import classes from "./MovieForAll.module.css";
import MovieDetail from "../MovieDetail/MovieDetail";
import Navbar from "../Navbar/Navbar";
import MovieList from "../MovieList/MovieList";

const MovieForAll = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const response = await fetch(
        "https://movie-backend-8506.onrender.com/api/movies"
      );
      const dataMovies = await response.json();
      setMovies(dataMovies.data);
      setLoading(false);
    };
    fetchMovies();
  }, []);

  console.log(movies);
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
    <>
      {loading ? (
        <h1>Loading please wait</h1>
      ) : (
        <div>
          <Navbar />
          <section className={classes.container}>
            <span className={classes.title}>
              <MovieList />
            </span>
          </section>
          <section className={classes.content}>
            <div className={classes.item}>
              {/* kiểm tra xem có dữ liệu hay không có thì hiển thị ra giao diện */}
              {movies?.map((movie, index) => (
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
      )}
    </>
  );
};

export default MovieForAll;
