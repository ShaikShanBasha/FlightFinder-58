import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FlightRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:6001/flight-requests');
        setRequests(response.data);
      } catch (err) {
        setError('Failed to load flight requests.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) return <p>Loading flight requests...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Flight Requests</h2>
      {requests.length === 0 ? (
        <p>No flight requests found.</p>
      ) : (
        <ul>
          {requests.map((req) => (
            <li key={req.id}>
              <b>{req.flightName}</b> from {req.origin} to {req.destination} requested by {req.userEmail}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FlightRequests;
