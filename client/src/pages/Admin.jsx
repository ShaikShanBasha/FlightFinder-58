import React, { useEffect, useState } from 'react';
import '../styles/Admin.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Admin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [bookingCount, setbookingCount] = useState(0);
  const [flightsCount, setFlightsCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [userRes, bookingRes, flightRes] = await Promise.all([
        axios.get('http://localhost:6001/fetch-users'),
        axios.get('http://localhost:6001/fetch-bookings'),
        axios.get('http://localhost:6001/fetch-flights')
      ]);

      const allUsers = userRes.data;
      setUserCount(allUsers.filter(user => user.usertype !== 'admin').length);
      setUsers(allUsers.filter(user => user.approval === 'not-approved'));

      setbookingCount(bookingRes.data.length);
      setFlightsCount(flightRes.data.length);
    } catch (err) {
      console.error('Error fetching data:', err);
      alert('Failed to load admin dashboard data.');
    }
  };

  const approveRequest = async (id) => {
    try {
      await axios.post('http://localhost:6001/approve-operator', { id });
      alert("Operator approved!!");
      fetchData();
    } catch (err) {
      console.error('Approval failed:', err);
      alert("Failed to approve operator.");
    }
  };

  const rejectRequest = async (id) => {
    try {
      await axios.post('http://localhost:6001/reject-operator', { id });
      alert("Operator rejected!!");
      fetchData();
    } catch (err) {
      console.error('Rejection failed:', err);
      alert("Failed to reject operator.");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-cards">
        <div className="card admin-card users-card">
          <h4>Users</h4>
          <p>{userCount}</p>
          <button className="btn btn-primary" onClick={() => navigate('/all-users')}>View all</button>
        </div>

        <div className="card admin-card transactions-card">
          <h4>Bookings</h4>
          <p>{bookingCount}</p>
          <button className="btn btn-primary" onClick={() => navigate('/all-bookings')}>View all</button>
        </div>

        <div className="card admin-card deposits-card">
          <h4>Flights</h4>
          <p>{flightsCount}</p>
          <button className="btn btn-primary" onClick={() => navigate('/all-flights')}>View all</button>
        </div>
      </div>

      <div className="admin-requests-container">
        <h3>New Operator Applications</h3>
        <div className="admin-requests">
          {users.length === 0 ? (
            <p>No new requests..</p>
          ) : (
            users.map((user) => (
              <div className="admin-request" key={user._id}>
                <span><b>Operator name:</b> {user.username}</span>
                <span><b>Operator email:</b> {user.email}</span>
                <div className="admin-request-actions">
                  <button className='btn btn-primary' onClick={() => approveRequest(user._id)}>Approve</button>
                  <button className='btn btn-danger' onClick={() => rejectRequest(user._id)}>Reject</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
