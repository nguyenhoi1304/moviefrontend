import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import classes from "./SearchFilm.module.css";
import ResultList from "../../components/ResultList/ResultList";

function SearchFilm(props) {
  const [keyword, setKeyword] = useState("");
  const [genre, setGenre] = useState("");
  const [yearMovie, setYearMovie] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [language, setLanguage] = useState("");
  const [resultMovies, setResultsMovie] = useState([]);
  const [message, setMessage] = useState("");

  const postData = (e) => {
    e.preventDefault();
    fetch(
      "https://movie-backend-8506.onrender.com/api/movies/search?token=8qlOkxz4wq",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keyword: keyword,
          genre: genre,
          mediaType: mediaType,
          language: language,
          yearMovie: yearMovie,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
        setResultsMovie(data.results);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="app">
      {/* Phần Navbar */}
      <Navbar />
      <section className={classes.container}>
        <span className={classes.title}></span>
        <form>
          <section>
            <input
              type="text"
              required
              value={keyword}
              placeholder="Nhập tên để tìm film "
              onChange={(e) => setKeyword(e.target.value)}
            ></input>
          </section>
          <section>
            <input
              type="text"
              required
              value={genre}
              placeholder="Nhập tên thể loại film "
              onChange={(e) => setGenre(e.target.value)}
            ></input>
          </section>
          <section
            className={classes.media}
            onChange={(e) => setMediaType(e.target.value)}
          >
            <label>MediaType</label>
            <select className={classes.mediaType}>
              <option value="all">all</option>
              <option value="movie">movie</option>
              <option value="tv">tv</option>
              <option value="person">person</option>
            </select>
          </section>
          <section
            className={classes.languageType}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <label>Language</label>
            <select className={classes.language}>
              <option value="en">en</option>
              <option value="ja">ja</option>
              <option value="ko">ko</option>
            </select>
          </section>
          <section>
            <input
              type="text"
              required
              value={yearMovie}
              placeholder="Nhập năm phát hành"
              onChange={(e) => setYearMovie(e.target.value)}
            ></input>
          </section>
          <button type="submit" onClick={postData}>
            Tìm kiếm Film
          </button>
        </form>
      </section>
      {message ? (
        <h1 className={classes.message}>
          No videos were found matching your search (Bắt buộc nhập tên để tìm
          kiếm film)
        </h1>
      ) : (
        <ResultList resultMovies={resultMovies} />
      )}
    </div>
  );
}

export default SearchFilm;
