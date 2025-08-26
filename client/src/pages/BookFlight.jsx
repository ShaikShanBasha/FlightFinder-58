import React, { useContext, useEffect, useState } from 'react';
import '../styles/BookFlight.css';
import { GeneralContext } from '../context/GeneralContext';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BookFlight = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [flightName, setFlightName] = useState('');
  const [flightId, setFlightId] = useState('');
  const [basePrice, setBasePrice] = useState(0);
  const [startCity, setStartCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [startTime, setStartTime] = useState('');

  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [coachType, setCoachType] = useState('');
  const { ticketBookingDate } = useContext(GeneralContext);
  const [journeyDate, setJourneyDate] = useState(ticketBookingDate || '');

  const [numberOfPassengers, setNumberOfPassengers] = useState(0);
  const [passengerDetails, setPassengerDetails] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);

  const price = {
    economy: 1,
    'premium-economy': 2,
    business: 3,
    'first-class': 4,
  };

  useEffect(() => {
    fetchFlightData();
  }, []);

  const fetchFlightData = async () => {
    try {
      const response = await axios.get(`http://localhost:6001/fetch-flight/${id}`);
      const data = response.data;

      setFlightName(data.flightName);
      setFlightId(data.flightId);
      setBasePrice(data.basePrice);
      setStartCity(data.origin);
      setDestinationCity(data.destination);
      setStartTime(data.departureTime);
    } catch (err) {
      console.error('Failed to fetch flight data', err);
    }
  };

  const handlePassengerChange = (event) => {
    const value = parseInt(event.target.value);
    setNumberOfPassengers(value);

    // Ensure passengerDetails array length matches numberOfPassengers
    const newPassengerDetails = Array.from({ length: value }, (_, index) => {
      return passengerDetails[index] || { name: '', age: '' };
    });
    setPassengerDetails(newPassengerDetails);
  };

  const handlePassengerDetailsChange = (index, key, value) => {
    setPassengerDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index] = { ...updatedDetails[index], [key]: value };
      return updatedDetails;
    });
  };

  useEffect(() => {
    if (coachType && basePrice && numberOfPassengers) {
      setTotalPrice(price[coachType] * basePrice * numberOfPassengers);
    }
  }, [coachType, numberOfPassengers, basePrice]);

  const bookFlight = async () => {
    const inputs = {
      user: localStorage.getItem('userId'),
      flight: id,
      flightName,
      flightId,
      departure: startCity,
      journeyTime: startTime,
      destination: destinationCity,
      email,
      mobile,
      passengers: passengerDetails,
      totalPrice,
      journeyDate,
      seatClass: coachType,
    };

    try {
      await axios.post('http://localhost:6001/book-ticket', inputs);
      alert('Booking successful');
      navigate('/bookings');
    } catch (err) {
      console.error('Booking failed', err);
      alert('Booking failed!');
    }
  };

  return (
    <div className="BookFlightPage">
      <div className="BookingFlightPageContainer">
        <h2>Book Ticket</h2>

        <span>
          <p><b>Flight Name:</b> {flightName}</p>
          <p><b>Flight No:</b> {flightId}</p>
        </span>

        <span>
          <p><b>Base Price:</b> ₹{basePrice}</p>
        </span>

        <span>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInputemail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floatingInputemail">Email</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInputmobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <label htmlFor="floatingInputmobile">Mobile</label>
          </div>
        </span>

        <span className="span3">
          <div className="no-of-passengers">
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="floatingInputPassengerCount"
                value={numberOfPassengers}
                onChange={handlePassengerChange}
                min={1}
              />
              <label htmlFor="floatingInputPassengerCount">No of Passengers</label>
            </div>
          </div>

          <div className="form-floating mb-3">
            <input
              type="date"
              className="form-control"
              id="floatingInputJourneyDate"
              value={journeyDate}
              onChange={(e) => setJourneyDate(e.target.value)}
            />
            <label htmlFor="floatingInputJourneyDate">Journey Date</label>
          </div>

          <div className="form-floating">
            <select
              className="form-select form-select-sm mb-3"
              value={coachType}
              onChange={(e) => setCoachType(e.target.value)}
            >
              <option value="" disabled>Select Seat Class</option>
              <option value="economy">Economy Class</option>
              <option value="premium-economy">Premium Economy</option>
              <option value="business">Business Class</option>
              <option value="first-class">First Class</option>
            </select>
            <label htmlFor="floatingSelect">Seat Class</label>
          </div>
        </span>

        <div className="new-passengers">
          {Array.from({ length: numberOfPassengers }).map((_, index) => (
            <div className="new-passenger" key={index}>
              <h4>Passenger {index + 1}</h4>
              <div className="new-passenger-inputs">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id={`floatingInputPassengerName${index}`}
                    value={passengerDetails[index]?.name || ''}
                    onChange={(e) => handlePassengerDetailsChange(index, 'name', e.target.value)}
                  />
                  <label htmlFor={`floatingInputPassengerName${index}`}>Name</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id={`floatingInputPassengerAge${index}`}
                    value={passengerDetails[index]?.age || ''}
                    onChange={(e) => handlePassengerDetailsChange(index, 'age', e.target.value)}
                  />
                  <label htmlFor={`floatingInputPassengerAge${index}`}>Age</label>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h6><b>Total Price:</b> ₹{totalPrice}</h6>

        <button className="btn btn-primary" onClick={bookFlight}>
          Book Now
        </button>
      </div>
    </div>
  );
};

export default BookFlight;