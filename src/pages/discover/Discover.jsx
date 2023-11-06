import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import MovieList from "../../components/MovieList/MovieList";
import classes from "./Discover.module.css";
import { useParams } from "react-router-dom";

function Discover(props) {
  const [discover, setDiscover] = useState([]);

  // Nhận Params từ người dùng
  const { gerneID } = useParams();
  const { pageId } = useParams();

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        // nếu người dùng có nhập page thì lấy page không nhập sẽ mặc định lấy page = 1
        pageId
          ? `https://movie-backend-8506.onrender.com/api/movies/discover/${gerneID}/${pageId}`
          : `https://movie-backend-8506.onrender.com/api/movies/discover/${gerneID}/1`
      );
      const dataMovies = await response.json();
      setDiscover(dataMovies.results);
    };

    fetchMovies();
  }, [gerneID, pageId]);

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
        <MovieList movies={discover} />
      </section>
    </div>
  );
}

export default Discover;
