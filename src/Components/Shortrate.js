import React from 'react'
import './Shortrate.css'
import { useNavigate } from 'react-router-dom';


export default function Shortrate({ edata, goBack }) {
  const navigate = useNavigate();

  const sortedMovies = edata.sort((a, b) => b.vote_average - a.vote_average)
  return (
    <div>
      <div>
        <div className="container my-4">
          <button className='backclick' onClick={goBack}>Back to Movie List</button>
          <h2>Movies Sorted by Rating </h2>
          <div className="row">
            {sortedMovies.map((movie) => (
              <div className="col-md-3" key={movie.id}>
                <div onClick={() => navigate('/Moviedetail', { state: { id: movie.id } })} className="card movie-card">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className="card-img-top"
                    alt={movie.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text">Rating: {movie.vote_average}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
