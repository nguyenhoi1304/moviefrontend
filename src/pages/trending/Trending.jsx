import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import MovieList from "../../components/MovieList/MovieList";
import classes from "./Trending.module.css";
import { useParams } from "react-router-dom";

function Trending(props) {
  const [trendDings, setTrendDings] = useState([]);

  // Nhận Params từ người dùng
  const { pageId } = useParams();

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        // nếu người dùng có nhập page thì lấy page không nhập sẽ mặc định lấy page = 1

        pageId
          ? `https://movie-backend-8506.onrender.com/api/movies/trending/${pageId}`
          : `https://movie-backend-8506.onrender.com/api/movies/trending?token=8qlOkxz4wq/1`
      );
      const dataMovies = await response.json();
      setTrendDings(dataMovies.results);
    };

    fetchMovies();
  }, [pageId]);

  return (
    <div className="app">
      {/* Phần Navbar */}
      <Navbar />

      <section className={classes.container}>
        <span className={classes.title}></span>
        <MovieList />
      </section>

      {/*danh sách phim Xu hướng */}
      <section className={classes.container}>
        <span className={classes.title}>Xu Hướng</span>
        <MovieList movies={trendDings} />
      </section>
    </div>
  );
}

export default Trending;
