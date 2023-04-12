import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import './signup.css'

const Signup = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [user, setUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [errorsList, setErrorsList] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/me')
    .then(resp => resp.json())
    .then(data => {
      setUser(data)
      if (data.error) {
        setLoggedIn(false)
      } else {
        setLoggedIn(true)
      }
    })
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    fetch('/signup', {
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: username, 
        password: password,
        email: email,
        role: role
      })
    })
    .then(resp => resp.json())
    .then(user => {
      if(!user.errors) {
        setUser(user)
        navigate('/')
      } else {
        setUsername('')
        setPassword('')
        const errorList = user.errors.map((e, index) => <li key={index}>{e}</li>)
        setErrorsList(errorList)
      }
    })
  }

  return (
    <div className='signup'>
      <span className='signupTitle'>CREATE ACCOUNT</span>
      <form  className='signupForm' onSubmit= { handleSubmit }>
          <label htmlFor="username">Username: </label>
          <input
            type="text" 
            name="username" 
            id="username" 
            className="signupInput"
            placeholder='Choose a username..'
            value={ username } 
            onChange={ e => setUsername(e.target.value)}
            autoFocus={ true }
          />  
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            className="signupInput"
            placeholder='Choose a password..'
            value={ password }
            onChange={ e => setPassword(e.target.value)}
          />
          <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              id="email"
              className="signupInput"
              placeholder='Enter your email..'
              value={ email }
              onChange={ e => setEmail(e.target.value)}
            />
          <label htmlFor="role">Role: </label>
            <select
              name="role"
              id="role"
              className="signupInput"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="blank">Choose One</option>
              <option value="customer">Customer</option>
              <option value="restaurant_owner">Restaurant Owner</option>
            </select>
        <input className="signupButton" type="submit" value="Create Account"/>
      </form>
      <ul>
        {errorsList}
      </ul>
    </div>
  )
}

export default Signup