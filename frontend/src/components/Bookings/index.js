import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';

function Bookings() {
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [bookings, setBookings] = useState([]);
    const [id, setId] = useState('');
    const [trains, setTrains] = useState([]);
    const navigate = useNavigate();
    const token = Cookies.get('token');

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
        <div className='booking-container'>
            <div>
                
                <h2>Bookings</h2>
                <button onClick={logout} className='button button5'>Logout</button><br />
                <input type="text" placeholder="train no" onChange={(e) => setId(e.target.value)} className='form-control input' />
                <div>
                    <button onClick={bookTrain} className='button button5'>Book Train</button><br />
                </div>
                {bookings !== undefined &&
                    < ul >
                        {
                            bookings.map(booking => (
                                <li key={booking.id}>Train ID: {booking.train_id} - Seat: {booking.seat_number}</li>
                            ))
                        }
                    </ul>
                }
                <Link to="/train" className='button button5'>Trains</Link><br /><br />
                <input type="text" className='form-control input' placeholder="Source" onChange={(e) => setSource(e.target.value)} /><br />
                <input type="text" className='form-control input' placeholder="Destination" onChange={(e) => setDestination(e.target.value)} /><br />
                <button onClick={getTrains} className='button button5'>Get Trains</button>
                {trains !== undefined &&
                    <ul>
                        {trains.map(train => (
                            <li key={train.id}>{train.train_name} - Seats: {train.available_seats}</li>
                        ))}
                    </ul>
                }
            </div>
        </div >
    );
}

export default Bookings;
