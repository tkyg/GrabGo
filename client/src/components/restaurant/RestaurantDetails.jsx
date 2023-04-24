import React, { useEffect } from 'react'
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { deleteRestaurant, loadSingleRestaurant } from '../actions/restaurantActions'
import MenuItemsForm from '../menuItems/MenuItemsForm';
import { addMenuItems } from '../actions/menuItemsActions';
import MenuItemsList from '../menuItems/MenuItemsList';


const RestaurantDetails = ({ loading }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const singleRestaurant = useSelector(store => store.restaurantsReducer.singleRestaurant)
  const { id } = useParams();
  const { currentUser, loggedIn } = useSelector(store => store.usersReducer)


  useEffect(() => {
    if(!loading && !loggedIn) {
      navigate('/login')
    } else {
      dispatch(loadSingleRestaurant(id));
    }
  }, [loading, loggedIn, navigate, dispatch, id]);

  useEffect(() => {
    console.log('Single restaurant updated');
  }, [singleRestaurant]);
  

  // const isOwner = singleRestaurant && singleRestaurant.user.id && currentUser && singleRestaurant.user.id === currentUser.id;
  const isOwner = singleRestaurant && singleRestaurant.user && singleRestaurant.user.id && currentUser && singleRestaurant.user.id === currentUser.id;

  const handleDelete = () => {
    console.log(singleRestaurant.id)
    dispatch(deleteRestaurant(singleRestaurant.id, navigate))
  }
 
  // April 20th edit:

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
            <p>
            {loggedIn && isOwner && (
              <button onClick={() => navigate(`/restaurants/${singleRestaurant.id}/edit`, { restaurant: singleRestaurant })}>Edit</button>
              )}
            </p>
              <p>
              {loggedIn && isOwner && (
                <button onClick={handleDelete}>Delete Restaurant</button>
              )}
              </p>
          </div>
          <br/>
          <div>
            <h2>Menu</h2>
            {loggedIn && isOwner && (
              <NavLink to={'/menu_items'}>Update Menu</NavLink>
            )}
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