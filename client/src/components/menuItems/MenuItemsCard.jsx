import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, NavLink} from 'react-router-dom'
import { deleteMenuItem } from '../actions/menuItemsActions'
import '../../styles/menuItemsCard.css'


const MenuItemsCard = ({ menuItem }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  // const singleMenuItem = useSelector(store => store.menuItemsReducer)
  const singleRestaurant = useSelector(store => store.restaurantsReducer.singleRestaurant)

  const handleDelete = () => {
    dispatch(deleteMenuItem(menuItem.id, navigate, singleRestaurant.id))
  }
 
  return (
    <div className='singleMenuItem'>
      <div className='singleMenuItemWrapper'>
        <p className='menuItemFontTitle'>{menuItem.name} - $ {menuItem.price}</p>
      <br/>
        <p className='menuItemFont'>{menuItem.description}</p>
        <p className='menuItemFont'>{menuItem.is_vegetarian}</p>
        <p className='menuItemFont'>{menuItem.is_gluten_free}</p>
      <br/>
        <NavLink to={`/menu_items/${menuItem.id}/edit`}>
          <div className='singleMenuItemEdit'>
            <i className="singleBlogIcon fa-regular fa-pen-to-square">
              Edit
            </i>
          </div>
        </NavLink>
      </div>
        <div className='singleMenuItemDelete'>
          <i className='singleMenuItemIcon fa-regular fa-trash-can' onClick={handleDelete}>Delete</i>
        </div>       
      <br/>
    </div>
  )
}

export default MenuItemsCard
