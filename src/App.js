import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Trending from "./pages/trending/Trending";
import TopRate from "./pages/topRate/TopRate";
import Discover from "./pages/discover/Discover";
import FindTrailerId from "./pages/findTrailerId/FindTrailerId";
import SearchFilm from "./pages/searchFilm/SearchFilm";
import NotFound from "./components/NotFound/NotFound";
import MovieForAll from "./components/MovieForAll/MovieForAll";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MovieForAll />} />
        <Route path="/api/movies" element={<MovieForAll />} />
        <Route path="api/movies/trending" element={<Trending />} />
        <Route path="api/movies/trending/:pageId" element={<Trending />} />
        <Route path="api/movies/top-rate" element={<TopRate />} />
        <Route path="api/movies/top-rate/:pageId" element={<TopRate />} />
        <Route path="api/movies/discover/:gerneID" element={<Discover />} />
        <Route
          path="api/movies/discover/:gerneID/:pageId"
          element={<Discover />}
        />
        <Route path="api/movies/video" element={<FindTrailerId />} />
        <Route path="api/movies/search" element={<SearchFilm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
