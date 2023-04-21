import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../actions/errorActions';
import { loginUser } from '../actions/userActions';
// import './login.css';

const Login = ({loading}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loggedIn } = useSelector(store => store.usersReducer);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(!loading && loggedIn) {
      navigate('/')
    }
    return () => {
      dispatch(clearErrors())
    }
  }, [loading, loggedIn, navigate, dispatch])

  const handleSubmit = event => {
    event.preventDefault();
    const user = { username, password }

    dispatch(loginUser(user, navigate))
  }

  return (
    <form onSubmit={ handleSubmit }>
    <h1>Login</h1>
    <div>
      <label htmlFor="username">Username: </label>
      <input 
        type="text" 
        name="username" 
        id="username"
        value={ username }
        onChange={ e => setUsername(e.target.value) }
        required={true}
       />
    </div>
    <div>
      <label htmlFor="password">Password: </label>
      <input 
        type="password"
        name="password" 
        id="password"
        value={ password }
        onChange={ e => setPassword(e.target.value) }
        required={true}
       />
    </div>
    <input type="submit" value="Login" />
  </form>
  );
};

export default Login;

 // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const response = await fetch('/login', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       username: username,
  //       password: password,
  //     }),
  //   });
  //   const data = await response.json();
  //   if (!data.errors) {
  //     navigate('/');
  //   } else {
  //     setUsername('');
  //     setPassword('');
  //     setErrors(data.errors);
  //   }
  // };