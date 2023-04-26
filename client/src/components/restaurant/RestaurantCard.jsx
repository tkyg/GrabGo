import React from 'react'
import { NavLink } from 'react-router-dom'
import '../../styles/restaurantCard.css'



const RestaurantCard = ({restaurant}) => {

  // const zipCode = restaurant.zip_code.slice(0, 5);

  
  return (
    <div className='cardStyle'>
      <h3 className='restaurantHeaderRight'>
        <NavLink style={{textDecoration: "none"}} to={`/restaurants/${restaurant.id}`}>
          {restaurant.name}
        </NavLink>
      </h3>
        <p className='restaurantHeaderCenter'>{restaurant.category}</p>
        <p className='restaurantHeaderLeft'>{restaurant.description}</p>
      <br />
    </div>
  )
}

export default RestaurantCard
