import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadRestaurants, filterRestaurantsByZipcode } from '../actions/restaurants';
import RestaurantCard from './RestaurantCard';

const RestaurantList = () => {
  const [zipcode, setZipcode] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryZipcode = searchParams.get('zipcode');
    if (queryZipcode) {
      setZipcode(queryZipcode);
      dispatch(filterRestaurantsByZipcode(queryZipcode));
    } else {
      dispatch(loadRestaurants())
    }
  }, [location.search, dispatch]);

  const restaurants = useSelector(
    (store) => store.restaurantsReducer.restaurants
  );
  
  const restaurantList = restaurants.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant}/>)

  return (
    <div>
      {/* <h1>Restaurants with Zip Code: {zipcode}</h1> */}
      {restaurantList}
    </div>
  );
};

export default RestaurantList;


