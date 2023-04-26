import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import RestaurantCard from './RestaurantCard'
import { useDispatch } from 'react-redux'
import { loadRestaurants } from '../actions/restaurantActions'
import { useNavigate } from 'react-router-dom'
import '../../styles/restaurantList.css'

const RestaurantList = ({ loading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { loggedIn } = useSelector(store => store.usersReducer)
  const restaurants = useSelector(store => store.restaurantsReducer.restaurants)
 

  useEffect(() => {
    if(!loading && !loggedIn) {
      navigate('/login')
    }
    dispatch(loadRestaurants())
  }, [dispatch, loading, loggedIn, navigate])

  // const restaurants = useSelector(store => store.restaurantsReducer.restaurants)

  // april 19

  // const restaurantList = restaurants.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant}/>)

  const restaurantList = restaurants && restaurants.length > 0
  ? restaurants.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant}/>)
  : null;
  
  return (
    <div >
      <div className='restaurantHeaders'>
        <div className='restaurantHeaderLeft'>Restaurant Name</div>
        <div className='restaurantHeaderCenter'>Category</div>
        <div className='restaurantHeaderRight'>Description</div>
        </div>
      <div>
        {restaurantList}
      </div>   
    </div>
  )
}

export default RestaurantList

