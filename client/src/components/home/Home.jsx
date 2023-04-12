import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { filterRestaurantsByZipcode } from '../actions/restaurants'
import { useNavigate } from 'react-router-dom'
// starting my change


const Home = () => {

  const [zipcode, setZipcode] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const restaurants = useSelector(store => store.restaurantsReducer.restaurants)

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(filterRestaurantsByZipcode(zipcode));
    navigate(`/restaurants?zipcode=${zipcode}`)
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={zipcode}
          onChange={(event) => setZipcode(event.target.value)}
          placeholder="Enter a zip code"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  )
}

export default Home
