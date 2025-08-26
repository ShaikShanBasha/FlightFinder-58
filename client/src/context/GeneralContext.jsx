import React, { createContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const GeneralContext = createContext();

const GeneralContextProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usertype, setUsertype] = useState('');
  const [homeBranch, setHomeBranch] = useState('');
  const [ticketBookingDate, setTicketBookingDate] = useState();

  const navigate = useNavigate();

  const inputs = { username, email, usertype, password, homeBranch };

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:6001/login', {
        email,
        password,
      });

      const user = res.data.user;

      localStorage.setItem('userId', user.id);
      localStorage.setItem('userType', user.usertype);
      localStorage.setItem('username', user.username);
      localStorage.setItem('email', user.email);

      if (user.usertype === 'customer') {
        navigate('/');
      } else if (user.usertype === 'admin') {
        navigate('/admin');
      } else if (user.usertype === 'flight-operator') {
        navigate('/flight-admin');
      }
    } catch (err) {
      console.error('Login failed:', err);
      alert('Login failed!');
    }
  };

  const register = async () => {
    try {
      const res = await axios.post('http://localhost:6001/register', inputs);

      const user = res.data.user;

      localStorage.setItem('userId', user._id);
      localStorage.setItem('userType', user.usertype);
      localStorage.setItem('username', user.username);
      localStorage.setItem('email', user.email);

      if (user.usertype === 'customer') {
        navigate('/');
      } else if (user.usertype === 'admin') {
        navigate('/admin');
      } else if (user.usertype === 'flight-operator') {
        navigate('/flight-admin');
      }
    } catch (err) {
      console.error('Registration failed:', err);
      alert('Registration failed!');
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <GeneralContext.Provider
      value={{
        login,
        register,
        logout,
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        usertype,
        setUsertype,
        homeBranch,
        setHomeBranch,
        ticketBookingDate,
        setTicketBookingDate,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;