import React, { useEffect, useState } from 'react';
import '../styles/NewFlight.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditFlight = () => {
  const [flightName, setFlightName] = useState('');
  const [flightId, setFlightId] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [startTime, setStartTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [totalSeats, setTotalSeats] = useState(0);
  const [basePrice, setBasePrice] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    fetchFlightData();
  }, []);

  const fetchFlightData = async () => {
    try {
      const response = await axios.get(`http://localhost:6001/fetch-flight/${id}`);
      const data = response.data;

      setFlightName(data.flightName || '');
      setFlightId(data.flightId || '');
      setOrigin(data.origin || '');
      setDestination(data.destination || '');
      setTotalSeats(data.totalSeats || 0);
      setBasePrice(data.basePrice || 0);

      // Format departureTime to "HH:mm" string
      if (data.departureTime) {
        const [depHour, depMinute] = data.departureTime.split(':');
        const formattedDepTime = `${depHour.padStart(2, '0')}:${depMinute.padStart(2, '0')}`;
        setStartTime(formattedDepTime);
      } else {
        setStartTime('');
      }

      // Format arrivalTime to "HH:mm" string
      if (data.arrivalTime) {
        const [arrHour, arrMinute] = data.arrivalTime.split(':');
        const formattedArrTime = `${arrHour.padStart(2, '0')}:${arrMinute.padStart(2, '0')}`;
        setArrivalTime(formattedArrTime);
      } else {
        setArrivalTime('');
      }
    } catch (error) {
      console.error('Failed to fetch flight data:', error);
      alert('Error fetching flight data');
    }
  };

  const handleSubmit = async () => {
    try {
      const inputs = {
        _id: id,
        flightName,
        flightId,
        origin,
        destination,
        departureTime: startTime,
        arrivalTime,
        basePrice: parseFloat(basePrice),
        totalSeats: parseInt(totalSeats, 10),
      };

      await axios.put('http://localhost:6001/update-flight', inputs);
      alert('Flight updated successfully!');
      // Optionally reset or navigate somewhere
    } catch (error) {
      console.error('Failed to update flight:', error);
      alert('Failed to update flight');
    }
  };

  return (
    <div className="NewFlightPage">
      <div className="NewFlightPageContainer">
        <h2>Edit Flight</h2>

        <span className="newFlightSpan1">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="flightName"
              value={flightName}
              disabled
            />
            <label htmlFor="flightName">Flight Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="flightId"
              value={flightId}
              onChange={(e) => setFlightId(e.target.value)}
            />
            <label htmlFor="flightId">Flight Id</label>
          </div>
        </span>

        <span>
          <div className="form-floating mb-3">
            <select
              className="form-select form-select-sm"
              aria-label="Departure City"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            >
              <option value="" disabled>
                Select Departure City
              </option>
              <option value="Chennai">Chennai</option>
              <option value="Banglore">Banglore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Indore">Indore</option>
              <option value="Delhi">Delhi</option>
              <option value="Pune">Pune</option>
              <option value="Trivendrum">Trivendrum</option>
              <option value="Bhopal">Bhopal</option>
              <option value="Kolkata">Kolkata</option>
              <option value="varanasi">Varanasi</option>
              <option value="Jaipur">Jaipur</option>
            </select>
            <label htmlFor="origin">Departure City</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="time"
              className="form-control"
              id="departureTime"
              value={startTime || ''}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <label htmlFor="departureTime">Departure Time</label>
          </div>
        </span>

        <span>
          <div className="form-floating mb-3">
            <select
              className="form-select form-select-sm"
              aria-label="Destination City"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              <option value="" disabled>
                Select Destination City
              </option>
              <option value="Chennai">Chennai</option>
              <option value="Banglore">Banglore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Indore">Indore</option>
              <option value="Delhi">Delhi</option>
              <option value="Pune">Pune</option>
              <option value="Trivendrum">Trivendrum</option>
              <option value="Bhopal">Bhopal</option>
              <option value="Kolkata">Kolkata</option>
              <option value="varanasi">Varanasi</option>
              <option value="Jaipur">Jaipur</option>
            </select>
            <label htmlFor="destination">Destination City</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="time"
              className="form-control"
              id="arrivalTime"
              value={arrivalTime || ''}
              onChange={(e) => setArrivalTime(e.target.value)}
            />
            <label htmlFor="arrivalTime">Arrival Time</label>
          </div>
        </span>

        <span className="newFlightSpan2">
          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control"
              id="totalSeats"
              value={totalSeats}
              onChange={(e) => setTotalSeats(parseInt(e.target.value, 10) || 0)}
              min={0}
            />
            <label htmlFor="totalSeats">Total Seats</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control"
              id="basePrice"
              value={basePrice}
              onChange={(e) => setBasePrice(parseFloat(e.target.value) || 0)}
              min={0}
              step="0.01"
            />
            <label htmlFor="basePrice">Base Price</label>
          </div>
        </span>

        <button className="btn btn-primary" onClick={handleSubmit}>
          Update
        </button>
      </div>
    </div>
  );
};

export default EditFlight;