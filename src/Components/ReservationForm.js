import React, { useState } from 'react';
import './ReservationForm.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ReservationForm = ({ movieTitle }) => {
    const [numSeats, setNumSeats] = useState(1);
    const navigate = useNavigate();

    // Get available seats 
    const availableSeats = Cookies.get('numSeats') ? parseInt(Cookies.get('numSeats')) : 10;

    // Get the total quantity 
    const totalQuantity = Cookies.get('totalQuantity') ? parseInt(Cookies.get('totalQuantity')) : 0;

    const handleSubmit = (e) => {
        e.preventDefault();

        const numSeatsInt = parseInt(numSeats);

        if (totalQuantity + numSeatsInt > availableSeats) {
            alert('Seats are not available');
            return;
        }

        alert(`Reserved ${numSeatsInt} seat for "${movieTitle}".`);
        // navigate to the Addtocart page after reservation
        navigate('/Addtocart');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label className='lablestyl'>
                    Number of Seats are Booking:
                    <input

                        type="number"
                        min="1"
                        value={numSeats}
                        onChange={(e) => setNumSeats(e.target.value)}
                    />
                </label>
                <button className='backclick' type="submit">Reserve</button>
            </form>
        </div>
    );
};

export default ReservationForm;
