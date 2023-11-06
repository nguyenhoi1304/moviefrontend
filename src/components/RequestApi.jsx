import { useEffect, useState } from "react";

export const API_KEY = "9c1861230a76a1861f77f93cb0cacc9a";

export const Apis = () => {
  const [MovieAll, setMovieAll] = useState([]);

  //Fetch api fetchTrending:Xu hướng
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `https://movie-backend-8506.onrender.com/api/movies?token=8qlOkxz4wq`
      );
      const dataMovies = await response.json();
      setMovieAll(dataMovies.data);
    };

    fetchMovies();
  }, []);

  // trả về các hàm chứa các Api được lấy từ sever
  return {
    MovieAll,
  };
};
