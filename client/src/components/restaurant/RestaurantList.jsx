import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import RestaurantCard from './RestaurantCard'
import { useDispatch } from 'react-redux'
import { loadRestaurants } from '../actions/restaurants'

const RestaurantList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadRestaurants())
  }, [dispatch])

  const restaurants = useSelector(store => store.restaurantsReducer.restaurants)

  // starting my change

  const restaurantList = restaurants.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant}/>)
  return (
    <div>
      {restaurantList}
    </div>
  )
}

export default RestaurantList


