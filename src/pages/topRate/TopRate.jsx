import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import MovieList from "../../components/MovieList/MovieList";
import classes from "./TopRate.module.css";
import { useParams } from "react-router-dom";

function TopRate(props) {
  const [topRated, setTopRated] = useState([]);

  // Nhận Params từ người dùng
  const { pageId } = useParams();

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        // nếu người dùng có nhập page thì lấy page không nhập sẽ mặc định lấy page = 1

        pageId
          ? `https://movie-backend-8506.onrender.com/api/movies/top-rate/${pageId}`
          : `https://movie-backend-8506.onrender.com/api/movies/top-rate?token=8qlOkxz4wq/1`
      );
      const dataMovies = await response.json();
      setTopRated(dataMovies.results);
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

      {/*danh sách phim Xếp hạng cao */}
      <section className={classes.container}>
        <span className={classes.title}>Xếp hạng cao</span>
        <MovieList movies={topRated} />
      </section>
    </div>
  );
}

export default TopRate;
