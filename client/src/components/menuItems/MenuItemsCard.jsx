import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, NavLink} from 'react-router-dom'
import { deleteMenuItem } from '../actions/menuItemsActions'


const MenuItemsCard = ({ menuItem }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  // const singleMenuItem = useSelector(store => store.menuItemsReducer)
  const singleRestaurant = useSelector(store => store.restaurantsReducer.singleRestaurant)

  const handleDelete = () => {
    dispatch(deleteMenuItem(menuItem.id, navigate, singleRestaurant.id))
  }
 
  return (
    <div>
      <p>{menuItem.name} - {menuItem.price}</p>
      <p>{menuItem.description}</p>
      <p>{menuItem.is_vegetarian}</p>
      <p>{menuItem.is_gluten_free}</p>
      <button><NavLink to={`/menu_items/${menuItem.id}/edit`}>Edit Menu Item</NavLink></button>
      <button onClick={handleDelete}>Delete Menu Item</button>
      <br/>
      
    </div>
  )
}

export default MenuItemsCard
