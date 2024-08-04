import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const token = Cookies.get('token');

function Bookings() {
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [bookings, setBookings] = useState([]);
    const [id, setId] = useState('');
    const [trains, setTrains] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (token === undefined || token === null) {
            navigate('/login');
        } else {
            fetchBookings();
        }
        
    }, []);

    const fetchBookings = async () => {
        const options = {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "token": token
            }
        }
        const response = await fetch('http://localhost:3000/api/booking-details', options);
        const data = await response.json();
        console.log(data);
        setBookings(data);
    };
    const bookTrain = async () => {
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "token": token,
            },
            body: JSON.stringify({ train_id: id })
        }
        //console.log(options);
        const response = await fetch('http://localhost:3000/api/book-seat', options);
        console.log(await response.json());
        fetchBookings();
    };
    const getTrains = async () => {
        const options = {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "token": token,
            }
        }
        const url = `http://localhost:3000/api/seat-availability?source=${source}&destination=${destination}`;
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        setTrains(data);
    };
    const logout = () => {
        Cookies.remove('token');
        navigate('/login');
    }

    return (
        <div>
            <button onClick={logout}>Logout</button><br />
            <h2>Bookings</h2>
            <input type="text" placeholder="train no" onChange={(e) => setId(e.target.value)} />
            <button onClick={bookTrain}>Book Train</button><br />
            {bookings !== undefined &&
                < ul >
                    {
                        bookings.map(booking => (
                            <li key={booking.id}>Train ID: {booking.train_id} - Seat: {booking.seat_number}</li>
                        ))
                    }
                </ul>
            }
            <Link to="/train">Trains</Link>
            <input type="text" placeholder="Source" onChange={(e) => setSource(e.target.value)} />
            <input type="text" placeholder="Destination" onChange={(e) => setDestination(e.target.value)} />
            <button onClick={getTrains}>Get Trains</button>
            {trains !== undefined &&
                <ul>
                    {trains.map(train => (
                        <li key={train.id}>{train.train_name} - Seats: {train.available_seats}</li>
                    ))}
                </ul>
            }
        </div >
    );
}

export default Bookings;
