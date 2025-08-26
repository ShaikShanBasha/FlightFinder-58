import React, { useContext } from 'react';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';

const Navbar = () => {
  const navigate = useNavigate();
  const usertype = localStorage.getItem('userType');
  const { logout } = useContext(GeneralContext);

  let title = 'SB Flights';
  let navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Login', path: '/auth' },
  ];

  if (usertype === 'customer') {
    navLinks = [
      { label: 'Home', path: '/' },
      { label: 'Bookings', path: '/bookings' },
      { label: 'Logout', action: logout },
    ];
  } else if (usertype === 'admin') {
    title = 'SB Flights (Admin)';
    navLinks = [
      { label: 'Home', path: '/admin' },
      { label: 'Users', path: '/all-users' },
      { label: 'Bookings', path: '/all-bookings' },
      { label: 'Flights', path: '/all-flights' },
      { label: 'Logout', action: logout },
    ];
  } else if (usertype === 'flight-operator') {
    title = 'SB Flights (Operator)';
    navLinks = [
      { label: 'Home', path: '/flight-admin' },
      { label: 'Bookings', path: '/flight-bookings' },
      { label: 'Flights', path: '/flights' },
      { label: 'Add Flight', path: '/new-flight' },
      { label: 'Logout', action: logout },
    ];
  }

  return (
    <div className="navbar">
      <h3>{title}</h3>
      <div className="nav-options">
        {navLinks.map((link, index) => (
          <p
            key={index}
            onClick={() => {
              if (link.action) link.action();
              else navigate(link.path);
            }}
          >
            {link.label}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
