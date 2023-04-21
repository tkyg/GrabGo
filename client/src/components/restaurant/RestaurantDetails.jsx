import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { loadSingleRestaurant } from '../actions/restaurantActions'
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
  // const single = singleRestaurant.user.id
  console.log(singleRestaurant)
  // console.log(single)
  console.log(isOwner)
 
  // April 20th edit:

  const handleMenuAddition = (newMenuItem) => {
    const updatedMenuItems = [...singleRestaurant.menu_items, newMenuItem];
    const updatedSingleRestaurant = { ...singleRestaurant, menu_items: updatedMenuItems };
    dispatch(addMenuItems(updatedSingleRestaurant));
  };

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
          </div>
          <br/>
          <div>
            <h2>Menu</h2>
            <button onClick={() => navigate('/menu_items/new')}>Add Menu</button>
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