import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await response.json();
    if (!data.errors) {
      navigate('/');
    } else {
      setUsername('');
      setPassword('');
      setErrors(data.errors);
    }
  };

  return (
    <div className="login">
      <span className="loginTitleLabel">LOGIN</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          id="username"
          className="loginInput"
          placeholder="Enter your username.."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus={true}
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          className="loginInput"
          placeholder="Enter your password.."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="loginButton">Login</button>
        {errors.length > 0 && (
          <ul className="errorList">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

export default Login;