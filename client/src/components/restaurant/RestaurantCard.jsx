import React from 'react'
import { NavLink } from 'react-router-dom'

const RestaurantCard = ({restaurant}) => {
  return (
    <div>
      <NavLink style={{textDecoration: "none"}} to={`/restaurants/${restaurant.id}`}>
        <h3>Restaurant Name: {restaurant.name}</h3>
      </NavLink>
      {/* <p>Address: {restaurant.address}</p>
      <p>{restaurant.zip_code}</p>
      <p>Phone Number: {restaurant.phone_number}</p> */}
      <br />
    </div>
  )
}

export default RestaurantCard