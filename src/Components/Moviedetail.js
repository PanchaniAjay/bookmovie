//show movie details Which one use are clicked
import React, { useEffect, useState } from 'react';
import './Moviedetail.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import ReservationForm from './ReservationForm';

export default function Moviedetail() {
    const location = useLocation();
    const [eventData, setEventData] = useState(null);
    const { id } = location.state || {};

    useEffect(() => {
        // get data from api
        const fetchMovies = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                    params: {
                        api_key: '2b9de9e7da659334fca850d8aadc33d3',
                        append_to_response: 'credits'
                    },
                });
                console.log('Movie data:', response);
                setEventData(response.data);

                // fisrt time by default nnumber of sheat are stetic is 10
                if (!Cookies.get('numSeats')) {
                    Cookies.set('numSeats', 10);
                    console.log('Cookie set for the first time');
                }
            } catch (error) {
                console.error('Error fetching movie data:', error);
            }
        };

        if (id) {
            fetchMovies();
        }
    }, [id]);

    if (!eventData) {
        return <div>Loading...</div>;
    }

    const posterUrl = `https://image.tmdb.org/t/p/w500/${eventData.poster_path}`;

    return (
        <div className="container my-4">
            <div className="container mt-5 p-4 text-white bgg">

                <div className="d-flex align-items-start">
                    <img src={posterUrl} alt='post' className="me-3 bg2" />
                    <div>
                        <h2>{eventData.original_title} <span className="text-muted">({new Date(eventData.release_date).getFullYear()})</span></h2>
                        <p className="mb-1 text-info">PG | {eventData.release_date} | {eventData.genres.map(genre => genre.name).join(', ')} | {eventData.runtime}m</p>
                        <div className="d-flex align-items-center mb-3">
                            <div className="badge bg-success fs-5">{eventData.vote_average * 10}%</div>
                            <span className="ms-2">User Score</span>
                        </div>
                        <button className="btn btn-outline-light btn-sm me-2">What's your Vibe?</button>
                        <button className="btn btn-outline-light btn-sm">Play Trailer</button>
                    </div>
                </div>

                <h4 className="mt-4">{eventData.tagline}</h4>
                <h5 className="mt-3">Overview</h5>
                <p className=''>{eventData.overview}</p>

                <ReservationForm movieTitle={eventData.original_title} />
            </div>
        </div>
    );
}
