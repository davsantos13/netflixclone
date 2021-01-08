import React, { useEffect, useState } from 'react';
import Tmbd from './Tmdb';
import MovieRows from './components/MovieRows';
import './App.css';
import FeatureMovie from './components/FeatureMovie';

export default () => {

  const [movies, setMovies] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmbd.getHomeList();
      setMovies(list);

      let originals = list.filter(i => i.slug === 'originals');
      let random = Math.floor(Math.random() * (originals[0].items.results.length - 1))

      let choosen = originals[0].items.results[random];

      let movieInfo = await Tmbd.getMovieInfo(choosen.id, 'tv');


      setFeaturedData(movieInfo);
    }

    loadAll();
  }, []);

  return (
    <div className="page">


      {featuredData &&
        <FeatureMovie item={featuredData}/>
      }


      <section className="lists">
        {movies.map((item, key) => (
          <MovieRows key={key} title={item.title} items={item.items} />
        ))}
      </section>
    </div>
  );
}