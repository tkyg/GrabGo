
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { loadSingleRestaurant } from '../actions/restaurants'


const RestaurantDetails = () => {
  const dispatch = useDispatch()
  const { id } = useParams();

  const singleRestaurant = useSelector(store => store.restaurantsReducer.singleRestaurant)

  useEffect(() => {
    dispatch(loadSingleRestaurant(id));
  }, [dispatch, id]);
  
  return (
    <>
      {singleRestaurant && (
        <>
          <div>
            <h3>{singleRestaurant.name}</h3>
            <p>{singleRestaurant.description}</p>
            <br/>
            <p>Address: {singleRestaurant.address}</p>
            <p>Zip Code: {singleRestaurant.zip_code}</p>
            <p>Contact Us At: {singleRestaurant.phone_number}</p>
          </div>
          <br/>
          <div>
            <h2>Menu</h2>
            {singleRestaurant.menu_items.map((menuItem) => (
              <div key={menuItem.id}>
                <h3>{menuItem.name} - ${menuItem.price}</h3>
                <p>{menuItem.description}</p>
                <p>{menuItem.is_vegetarian ? 'Vegetarian' : 'Non-Vegetarian'}</p>
                <p>{menuItem.is_gluten_free ? 'Gluten-Free' : 'Non-Gluten-Free'}</p>
                <br/>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default RestaurantDetails