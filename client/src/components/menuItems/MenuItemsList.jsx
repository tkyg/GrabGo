import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { loadMenuItems } from '../actions/menuItemsActions';
import MenuItemsCard from './MenuItemsCard';

const MenuItemsList = ({ loading, selectedMenuItems }) => {
  const [menuItemsList, setMenuItemsList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { loggedIn } = useSelector(store => store.usersReducer)
  const menuItems = useSelector(store => store.menuItemsReducer.menuItems)

  useEffect(() => {
    if(!loading && !loggedIn) {
      navigate('/login')
    }
    dispatch(loadMenuItems())
  }, [dispatch, loading, loggedIn, navigate])

  useEffect(() => {
    setMenuItemsList(selectedMenuItems);
  }, [selectedMenuItems]);

  const menuItemsCardList = menuItemsList.map((menuItem) => <MenuItemsCard key={menuItem.id} menuItem={menuItem}/>)
  return (
    <div>
      { menuItemsCardList }
    </div>
  )
}
export default MenuItemsList


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
