import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import classes from "./FindTrailerId.module.css";
import YouTube from "react-youtube";

function FindTrailerId(props) {
  const [filmId, setFilmId] = useState("");
  const [resultMovies, setResultsMovie] = useState([]);
  const [message, setMessage] = useState("");

  const postData = (e) => {
    e.preventDefault();
    fetch(
      "https://movie-backend-8506.onrender.com/api/movies/video?token=8qlOkxz4wq",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filmId: filmId }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResultsMovie(data.results);
        setMessage(data.message);
      })
      .catch((err) => console.log(err));
  };

  console.log(message);
  console.log(resultMovies);

  const opts = {
    height: "700",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="app">
      {/* Phần Navbar */}
      <Navbar />
      <section className={classes.container}>
        <span className={classes.title}></span>
        <form>
          <input
            type="number"
            required
            value={filmId}
            placeholder="Nhập id film "
            onChange={(e) => setFilmId(e.target.value)}
          ></input>
          <button type="submit" onClick={postData}>
            Tìm kiếm Trailer
          </button>
        </form>
      </section>

      {/* Hiển thị cho người dùng biết là chưa nhập id(Bắt buộc) mà => submit , Nếu nhập phù hợp thì sẽ hiển thị kết quả  */}
      {resultMovies === undefined ? (
        <h1 className={classes.message}>{message}</h1>
      ) : (
        resultMovies &&
        resultMovies.map((item) => (
          <YouTube
            key={item.id}
            videoId={item.key}
            id={item.id}
            opts={opts}
            type={item.type}
            site={item.site}
          />
        ))
      )}

      {/* Hiển thị thông báo cho người dùng biết là không tìm thấy video phù hợp  khi người dùng nhập sai Id*/}
      {resultMovies && message === undefined && resultMovies.length === 0 ? (
        <h1 className={classes.message}>
          The matching movie trailer Id you entered was not found, please
          re-enter
        </h1>
      ) : (
        ""
      )}
    </div>
  );
}

export default FindTrailerId;
