import React, { useEffect, useState } from 'react';
import '../styles/NewFlight.css';
import axios from 'axios';

const NewFlight = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const id = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:6001/fetch-user/${id}`);
      setUserDetails(response.data);
      console.log(response.data);
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  };

  const [flightName, setFlightName] = useState(localStorage.getItem('username') || '');
  const [flightId, setFlightId] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [startTime, setStartTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [totalSeats, setTotalSeats] = useState('');
  const [basePrice, setBasePrice] = useState('');

  const handleSubmit = async () => {
    if (!flightId || !origin || !destination || !startTime || !arrivalTime || !totalSeats || !basePrice) {
      alert('Please fill in all fields');
      return;
    }

    const inputs = {
      flightName,
      flightId,
      origin,
      destination,
      departureTime: startTime,
      arrivalTime,
      basePrice: Number(basePrice),
      totalSeats: Number(totalSeats),
    };

    try {
      await axios.post('http://localhost:6001/add-Flight', inputs);
      alert('Flight added successfully!!');
      setFlightId('');
      setOrigin('');
      setStartTime('');
      setArrivalTime('');
      setDestination('');
      setBasePrice('');
      setTotalSeats('');
    } catch (error) {
      console.error('Error adding flight:', error);
      alert('Failed to add flight. Please try again.');
    }
  };

  return (
    <div className='NewFlightPage'>
      {userDetails ? (
        <>
          {userDetails.approval === 'not-approved' ? (
            <div className="notApproved-box">
              <h3>Approval Required!!</h3>
              <p>Your application is under processing. It needs an approval from the administrator. Kindly please be patient!</p>
            </div>
          ) : userDetails.approval === 'approved' ? (
            <div className="NewFlightPageContainer">
              <h2>Add new Flight</h2>
              <span className='newFlightSpan1'>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInputFlightName"
                    value={flightName}
                    onChange={(e) => setFlightName(e.target.value)}
                    disabled
                  />
                  <label htmlFor="floatingInputFlightName">Flight Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInputFlightId"
                    value={flightId}
                    onChange={(e) => setFlightId(e.target.value)}
                  />
                  <label htmlFor="floatingInputFlightId">Flight Id</label>
                </div>
              </span>
              <span>
                <div className="form-floating">
                  <select
                    className="form-select form-select-sm mb-3"
                    aria-label="Select departure city"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="Chennai">Chennai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Indore">Indore</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Pune">Pune</option>
                    <option value="Trivandrum">Trivandrum</option>
                    <option value="Bhopal">Bhopal</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Varanasi">Varanasi</option>
                    <option value="Jaipur">Jaipur</option>
                  </select>
                  <label htmlFor="floatingSelectOrigin">Departure City</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="time"
                    className="form-control"
                    id="floatingInputStartTime"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                  <label htmlFor="floatingInputStartTime">Departure Time</label>
                </div>
              </span>
              <span>
                <div className="form-floating">
                  <select
                    className="form-select form-select-sm mb-3"
                    aria-label="Select destination city"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="Chennai">Chennai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Indore">Indore</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Pune">Pune</option>
                    <option value="Trivandrum">Trivandrum</option>
                    <option value="Bhopal">Bhopal</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Varanasi">Varanasi</option>
                    <option value="Jaipur">Jaipur</option>
                  </select>
                  <label htmlFor="floatingSelectDestination">Destination City</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="time"
                    className="form-control"
                    id="floatingInputArrivalTime"
                    value={arrivalTime}
                    onChange={(e) => setArrivalTime(e.target.value)}
                  />
                  <label htmlFor="floatingInputArrivalTime">Arrival time</label>
                </div>
              </span>
              <span className='newFlightSpan2'>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="floatingInputSeats"
                    value={totalSeats}
                    onChange={(e) => setTotalSeats(e.target.value)}
                  />
                  <label htmlFor="floatingInputSeats">Total seats</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id="floatingInputBasePrice"
                    value={basePrice}
                    onChange={(e) => setBasePrice(e.target.value)}
                  />
                  <label htmlFor="floatingInputBasePrice">Base price</label>
                </div>
              </span>
              <button className='btn btn-primary' onClick={handleSubmit}>
                Add now
              </button>
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default NewFlight;