import React from 'react'
import { useSelector } from 'react-redux'
import RestaurantCard from './RestaurantCard'

const RestaurantList = () => {
  const restaurants = useSelector(store => store.restaurantsReducer)

  const restaurantList = restaurants.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant}/>)
  return (
    <div>
      {restaurantList}
    </div>
  )
}

export default RestaurantList