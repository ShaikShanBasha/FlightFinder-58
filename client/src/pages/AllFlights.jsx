import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/AllFlights.css';

const AllFlights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFlights = async () => {
    try {
      const response = await axios.get('http://localhost:6001/fetch-flights');
      setFlights(response.data);
    } catch (err) {
      setError('Failed to fetch flights');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  if (loading) return <p>Loading flights...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="allFlightsPage">
      <h1>All Flights</h1>
      <div className="allFlights">
        {flights.map((flight) => (
          <div className="allFlights-Flight" key={flight._id}>
            <p><b>_id:</b> {flight._id}</p>
            <span>
              <p><b>Flight Id:</b> {flight.flightId}</p>
              <p><b>Flight name:</b> {flight.flightName}</p>
            </span>
            <span>
              <p><b>Starting station:</b> {flight.origin}</p>
              <p><b>Departure time:</b> {flight.departureTime}</p>
            </span>
            <span>
              <p><b>Destination:</b> {flight.destination}</p>
              <p><b>Arrival time:</b> {flight.arrivalTime}</p>
            </span>
            <span>
              <p><b>Base price:</b> {flight.basePrice}</p>
              <p><b>Total seats:</b> {flight.totalSeats}</p>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFlights;