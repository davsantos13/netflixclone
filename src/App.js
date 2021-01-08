import React, { useEffect, useState } from 'react';
import Tmbd from './Tmdb';
import MovieRows from './components/MovieRows';
import './App.css';

export default () => {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmbd.getHomeList();
      setMovies(list);
    }

    loadAll();
  }, []);

  return (
    <div className="page">
      <section className="lists">
        {movies.map((item, key) => (
          <MovieRows key={key} title={item.title} items={item.items} />
        ))}
      </section>
    </div>
  );
}