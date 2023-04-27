import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../actions/userActions'
import './navbar.css'

const NavBar = () => {
  const { loggedIn, currentUser} = useSelector(store => store.usersReducer)
 
  const dispatch = useDispatch()
  const navigate = useNavigate()
 
  const handleLogout = () => {
  dispatch(logoutUser(navigate))
  }

  if (loggedIn) {
    return (
      <div className="top">
        <div className="topCenter"></div>
          <ul className="topList">
            <li className="topListItem"><Link style={{textDecoration: "none"}} to='/'>HOME</Link></li>
            <li className="topListItem"><Link style={{textDecoration: "none"}} to='/restaurants'>RESTAURANTS</Link></li>           
            <li className="topListItem"><Link style={{textDecoration: "none"}} to='/restaurants/new'>ADD NEW RESTAURANT</Link></li>
          </ul>
          
        <div className="topRight">
          <li className="topRightList">Welcome {currentUser.username}</li>
          <li className="logoutButton"><Link style={{textDecoration: "none"}} to="/logout" className="link" onClick={handleLogout}>Logout</Link></li>
        </div>
      </div>
    )
  } else {
    return (
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem"><Link style={{textDecoration: "none"}} to='/login' className="link">Login</Link></li>
          <li className="topListItem"><Link style={{textDecoration: "none"}} to='/signup' className="link">Signup</Link></li>
        </ul>
      </div>
    )
  }
}

export default NavBar
// const loggedInLinks = () => {
//   return (
//     <>
//       <li><Link to='/'>Home</Link></li>
//       <li><Link to='/restaurants'>Restaurants</Link></li>
//       <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
//       {/* <li>Welcome {currentUser.username}</li> */}
//       <li><Link to='/restaurants/new'>Add New Restaurant</Link></li>
//     </>
//   )
// }

// const loggedOutLinks = () => {
//   return (
//     <>
//       <li><Link to='/login'>Login</Link></li>
//       <li><Link to='/signup'>Signup</Link></li>
//     </>
//   )
// }

// return (
//   <ul>
//     { loggedIn ? loggedInLinks() : loggedOutLinks() }
//   </ul>
// )
// }




 // const handleLogout = () => {
  //   fetch('/logout', {
  //     method: "DELETE",
  //     headers: { 'Content-Type': 'application/json' }
  //   })
  //   .then(() => {
  //     dispatch({type: "LOGOUT_USER"})
  //     navigate('/')
  //   })
  //   dispatch(logoutUser(navigate));
  // }

//   if (loggedIn) {
//     return (
//       <div>
//         <ul>
//           <li><Link to='/'>Home</Link></li>
//           <li><Link to='/restaurants'>Restaurants</Link></li>
//           <li><Link to="#" className="link" onClick={handleLogout}>Logout</Link></li>
//           <li>Welcome {currentUser.username}</li>
//           <li><Link to='/restaurants/new'>Add New Restaurant</Link></li>
//         </ul>
//       </div>
//     )
//   } else {
//     return (
//       <div>
//         <ul>
//           <li><Link to='/login'>Login</Link></li>
//           <li><Link to='/signup'>Signup</Link></li>
//         </ul>
//       </div>

//     )

//   }
// }