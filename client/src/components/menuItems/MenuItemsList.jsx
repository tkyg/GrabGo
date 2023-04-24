import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { loadMenuItems } from '../actions/menuItemsActions';
import MenuItemsCard from './MenuItemsCard';
import MenuItemsForm from './MenuItemsForm';
import { loadSingleRestaurant } from '../actions/restaurantActions';

const MenuItemsList = ({ loading }) => {
  // const [menuItemsList, setMenuItemsList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { loggedIn, currentUser } = useSelector(store => store.usersReducer)
  const singleRestaurant = useSelector(store => store.restaurantsReducer.singleRestaurant)
  const menuItems = useSelector(store => store.menuItemsReducer.menuItems)
  console.log(menuItems)


  const [showForm, setShowForm] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  useEffect(() => {
    if(!loading && !loggedIn) {
      navigate('/login')
    }
    dispatch(loadMenuItems())
  }, [dispatch, loading, loggedIn, navigate])

  const filteredMenuItems = menuItems.filter(menuItem => menuItem.restaurant.id === singleRestaurant.id);

  const handleShowForm = (menuItem) => {
    setSelectedMenuItem(menuItem);
    setShowForm(true);
  };

  const handleHideForm = () => {
    setSelectedMenuItem(null);
    setShowForm(false);
  };

  const isOwner = singleRestaurant && singleRestaurant.user && singleRestaurant.user.id && currentUser && singleRestaurant.user.id === currentUser.id;

  const menuItemsList = filteredMenuItems.map((menuItem) => <MenuItemsCard key={menuItem.id} menuItem={menuItem} onEdit={() => handleShowForm(menuItem)}/>)
  console.log(menuItems)

  return (
    <div>
      <h3>Menu List</h3>
      <>
      {loggedIn && isOwner && (
        <button onClick={handleShowForm}>Add Menu Item</button>
      )}
      
      {showForm && (
        <MenuItemsForm
          loading={loading}
          restaurantId={singleRestaurant.id}
          menuItem={selectedMenuItem}
          onHideForm={handleHideForm}
        />
      )}
      </>
      <br/>
      <br/>
      
      {menuItemsList}
      <div><NavLink to={`/restaurants`}>Form Complete, back to Restaurants</NavLink></div>
    </div>
  );
};
export default MenuItemsList
  {/* {filteredMenuItems.map((menuItem) => (
        <div key={menuItem.id}>
          <h4>{menuItem.name} - {menuItem.price}</h4>
          <p>{menuItem.description}</p>
          <p>{menuItem.is_gluten_free}</p>
          <p>{menuItem.is_vegetarian}</p>
        </div>
      ))} */}

  // return (
  //   <div>
  //     <h2>Menu</h2>
  //     <button onClick={() => navigate('/menu_items/new')}>Add Menu</button>
  //     {menuItems.map((menuItem) => (
  //       <div key={menuItem.id}>
  //         <h3>{menuItem.name} - ${menuItem.price}</h3>
  //         <p>{menuItem.description}</p>
  //         <p>{menuItem.is_vegetarian ? 'Vegetarian' : 'Non-Vegetarian'}</p>
  //         <p>{menuItem.is_gluten_free ? 'Gluten-Free' : 'Non-Gluten-Free'}</p>
  //         <br/>
  //       </div>
  //     ))}
  //   </div>
  // )
// }
