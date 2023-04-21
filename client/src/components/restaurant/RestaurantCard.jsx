import React from 'react'
import { NavLink } from 'react-router-dom'


const RestaurantCard = ({restaurant}) => {

  // const zipCode = restaurant.zip_code.slice(0, 5);

  
  return (
    <div>
      <h3>
        <NavLink style={{textDecoration: "none"}} to={`/restaurants/${restaurant.id}`}>
          Restaurant Name: {restaurant.name}
        </NavLink>
      </h3>
        <p>{restaurant.category}</p>
        <p>{restaurant.description}</p>
      <br />
    </div>
  )
}

export default RestaurantCard
