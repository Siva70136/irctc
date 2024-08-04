import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';

function Trains() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [trains, setTrains] = useState([]);
  const token = Cookies.get('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (token === undefined || token === null) {
      navigate('/login');
    }

  }, []);


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

  const addTrains = async () => {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "token": token,
      },
      body: JSON.stringify({ train_name: "Godavari express", source, destination, total_seats: 20 })
    }
    //console.log(options);
    const response = await fetch('http://localhost:3000/api/add-train', options);
    console.log(await response.json());
  };

  return (
    <div>
      <h2>Trains</h2>
      <input type="text" placeholder="Source" onChange={(e) => setSource(e.target.value)} />
      <input type="text" placeholder="Destination" onChange={(e) => setDestination(e.target.value)} />
      <button onClick={getTrains}>Get Trains</button>
      <button onClick={addTrains}>Add Trains</button>
      <Link to="/">Bookings</Link>
      {trains !== undefined &&
        <ul>
          {trains.map(train => (
            <li key={train.id}>{train.train_name} - Seats: {train.available_seats}</li>
          ))}
        </ul>
      }
    </div>
  );
}

export default Trains;
