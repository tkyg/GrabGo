import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../actions/userActions'

const NavBar = () => {

  const { loggedIn, currentUser} = useSelector(store => store.usersReducer)
  console.log("loggedIn", loggedIn);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // april 19

 const handleLogout = () => {
  dispatch(logoutUser(navigate))
 }

 if (loggedIn) {
      return (
        <div>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/restaurants'>Restaurants</Link></li>
            <li><Link to="#" className="link" onClick={handleLogout}>Logout</Link></li>
            <li>Welcome {currentUser.username}</li>
            <li><Link to='/restaurants/new'>Add New Restaurant</Link></li>
          </ul>
        </div>
      )
    } else {
      return (
        <div>
          <ul>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/signup'>Signup</Link></li>
          </ul>
        </div>
  
      )
  
    }
  }
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


export default NavBar

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