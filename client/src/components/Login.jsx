import React, { useContext } from 'react';
import { GeneralContext } from '../context/GeneralContext';

const Login = ({ setIsLogin }) => {
  const { email, password, setEmail, setPassword, login } = useContext(GeneralContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }
    await login();
  };

  return (
    <form className="authForm" onSubmit={handleLogin}>
      <h2>Login</h2>

      <div className="form-floating mb-3 authFormInputs">
        <input
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="floatingInput">Email address</label>
      </div>

      <div className="form-floating mb-3 authFormInputs">
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>

      <button type="submit" className="btn btn-primary">Sign in</button>

      <p>Not registered? <span style={{ cursor: 'pointer', color: '#007bff' }} onClick={() => setIsLogin(false)}>Register</span></p>
    </form>
  );
};

export default Login;