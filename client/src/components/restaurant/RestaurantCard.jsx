import React from 'react'
import { NavLink } from 'react-router-dom'


const RestaurantCard = ({restaurant}) => {

  const zipCode = restaurant.zip_code.slice(0, 5);
  
  return (
    <div>
      <NavLink style={{textDecoration: "none"}} to={`/restaurants/${restaurant.id}`}>
        <h3>Restaurant Name: {restaurant.name}</h3>
        <p>{restaurant.category}</p>
        <p>{restaurant.description}</p>
        <p>{zipCode}</p>  
      </NavLink>
      {/* <p>Address: {restaurant.address}</p>
      <p>Phone Number: {restaurant.phone_number}</p> */}
      <br />
    </div>
  )
}

export default RestaurantCard
