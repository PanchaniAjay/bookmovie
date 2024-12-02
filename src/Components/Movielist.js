import React, { useEffect, useState } from 'react';
import './Movielist.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Shortdate from './Shortdate';
import Shortrate from './Shortrate';
import Shortpop from './Shortpop';

export default function Movielist() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const [dateshort, setdateshort] = useState(false);
  const [rateshort, setrateshort] = useState(false);
  const [popshort, setpopshort] = useState(false);


  const [eData, setEData] = useState([]);

  useEffect(() => {
    // Fetch movies from the API
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
          params: {
            api_key: '2b9de9e7da659334fca850d8aadc33d3',
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);


  //date button click handler
  const dateClick = () => {
    setEData(movies);  // Pass all movie data to Shortdate component
    setdateshort(true); // Trigger the state to show Shortdate component
  }

  if (dateshort) {
    return (
      <div className="details-container">
        <Shortdate edata={eData} goBack={() => setdateshort(false)} />
      </div>
    );
  }

  //rateing button click
  const rateclick = () => {
    setEData(movies);
    setrateshort(true);
  }

  if (rateshort) {
    return (
      <div className="details-container">
        <Shortrate edata={eData} goBack={() => setrateshort(false)} />
      </div>
    );
  }


  const popclick = () => {
    setEData(movies);
    setpopshort(true);
  }
  if (popshort) {
    return (
      <div className="details-container">
        <Shortpop edata={eData} goBack={() => setpopshort(false)} />
      </div>
    );
  }

  return (
    <div className="container my-4">
      <div>
        <p>SHORT BY</p>
        <button className='clickbtn' onClick={dateClick}>DATE</button>
        <button className='clickbtn' onClick={rateclick}>RATING</button>
        <button className='clickbtn' onClick={popclick}>POPULARITY</button>
      </div>
      <div className="default row">
        {movies.map((movie) => (
          <div className="col-md-3" key={movie.id}>

            <div onClick={() => navigate('/Moviedetail', { state: { id: movie.id } })} className="card movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Use the full URL for the poster image
                className="card-img-top"
                alt={movie.title}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">Rating: {movie.vote_average}</p>
                <p className="card-text">Date: {movie.release_date}</p>
                <p className="card-text">Popularity: {movie.popularity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
