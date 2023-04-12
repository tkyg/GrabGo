import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NavBar = () => {

  const navigate = useNavigate()

  const logoutUser = () => {
    fetch('/logout', {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' }
    })
    .then(() => {
      // logout()
      navigate('/')
    })
  }


  return (
    <div>
      <ul>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/signup'>Signup</Link></li>
        <li><Link to="/logout" className="link" onClick={logoutUser}>Logout</Link></li>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/restaurants'>Restaurants</Link></li>
      </ul>
    </div>
  )
}

export default NavBar